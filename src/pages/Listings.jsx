import React, { useState, useEffect } from "react";
import { MapPin, Home, X, Search, Image } from "lucide-react";
import { Link } from "react-router-dom";
import { mockListings } from "../data/Listings";
import Button from "../components/Button";

const PLACEHOLDER =
  "https://via.placeholder.com/1200x800.png?text=No+Image+Available";

// Haversine formula
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Listings = () => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [radius, setRadius] = useState(10); // default 10 km
  const [filteredListings, setFilteredListings] = useState(mockListings);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 15;
  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);

  const handleSearch = () => {
    const results = mockListings.filter((listing) => {
      const matchesLocation = location
        ? listing.city?.toLowerCase().includes(location.toLowerCase())
        : true;
      const matchesType = type ? listing.transactionType === type : true;
      const matchesPrice =
        (minPrice ? listing.price >= minPrice : true) &&
        (maxPrice ? listing.price <= maxPrice : true);
      return matchesLocation && matchesType && matchesPrice;
    });
    setFilteredListings(results);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleAroundMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        const nearbyListings = mockListings.filter((listing) => {
          if (!listing.lat || !listing.lng) return false;
          const distance = getDistanceFromLatLonInKm(
            latitude,
            longitude,
            listing.lat,
            listing.lng
          );
          return distance <= radius;
        });
        setFilteredListings(nearbyListings);
        setCurrentPage(1);
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const clearFilters = () => {
    setLocation("");
    setType("");
    setMinPrice("");
    setMaxPrice("");
    setRadius(10);
    setFilteredListings(mockListings);
    setCurrentPage(1);
  };

  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 mt-14">
      {/* Search/Filter Card */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-6">Search Properties</h2>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
          {/* Location Input */}
          <div className="flex flex-col">
            <label className="flex items-center text-gray-700 font-medium mb-1 gap-1 text-sm">
              <MapPin className="w-4 h-4 text-gray-500" />
              Location
            </label>
            <input
              type="text"
              placeholder="City or neighborhood"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Type */}
          <div className="flex flex-col">
            <label className="flex items-center text-gray-700 font-medium mb-1 gap-1 text-sm">
              <Home className="w-4 h-4 text-gray-500" />
              Type
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Any</option>
              <option value="Buy">Buy</option>
              <option value="Rent">Rent</option>
              <option value="Lease">Lease</option>
            </select>
          </div>

          {/* Min Price */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1 text-sm">
              Min Price
            </label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          {/* Max Price */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1 text-sm">
              Max Price
            </label>
            <input
              type="number"
              placeholder="Any"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex justify-between items-center mt-6 flex-wrap gap-3 text-sm">
          {/* Around Me + Radius */}
          <div className="flex items-center gap-3">
            <Button className="cursor-pointer" onClick={handleAroundMe}>
              Around Me
            </Button>

            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 cursor-pointer"
                onClick={() => setRadius((r) => Math.max(1, r - 1))}
              >
                −
              </button>
              <span className="px-4 py-1 text-gray-700">{radius} km</span>
              <button
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 cursor-pointer"
                onClick={() => setRadius((r) => r + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Clear and Search Buttons */}
          <div className="flex gap-3">
            <Button
              className="cursor-pointer"
              onClick={clearFilters}
              variant="danger"
            >
              <X className="w-4 h-4" />
              Clear
            </Button>

            <Button className="cursor-pointer" onClick={handleSearch}>
              <Search className="w-4 h-4" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedListings.length === 0 ? (
          <p className="text-gray-700 col-span-full text-center">
            No properties found.
          </p>
        ) : (
          paginatedListings.map((listing) => {
            const images = Array.isArray(listing.images)
              ? listing.images
              : listing.image
              ? [listing.image]
              : listing.img
              ? [listing.img]
              : [];

            const firstImage = images[0] || PLACEHOLDER;
            const imageCount = images.length;

            const priceLabel =
              listing.transactionType === "Rent"
                ? `KES ${Number(listing.price).toLocaleString()} / month`
                : `KES ${Number(listing.price).toLocaleString()}`;

            return (
              <Link
                to={`/listing/${listing.transactionType?.toLowerCase()}/${
                  listing.id
                }`}
                key={listing.id}
                className="block transform transition duration-300 hover:scale-105"
              >
                <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:bg-gray-50 cursor-pointer relative">
                  <div className="relative w-full h-48">
                    <img
                      src={firstImage}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {imageCount > 1 && (
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Image className="w-3 h-3" />
                        <span>{imageCount} Photos</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    {/* Title */}
                    <h3 className="text-md font-semibold text-gray-800">
                      {listing.title}
                    </h3>

                    {/* Estate & City */}
                    <p className="text-gray-600 text-sm">
                      {listing.estate}, {listing.city}
                    </p>

                    {/* Address */}
                    <p className="text-gray-500 text-xs italic">
                      {listing.address}
                    </p>

                    {/* Price */}
                    <p className="text-indigo-600 font-bold mt-2 text-sm">
                      {priceLabel}
                    </p>

                    {/* Tags Row */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs text-gray-700 border rounded-2xl px-2 py-1 bg-gray-50">
                        {listing.transactionType}
                      </span>
                      <span className="text-xs text-gray-700 border rounded-2xl px-2 py-1 bg-gray-50">
                        {listing.purpose}
                      </span>
                      <span className="text-xs text-gray-700 border rounded-2xl px-2 py-1 bg-gray-50">
                        {listing.category}
                      </span>
                    </div>

                    {/* Optional quick stats (if residential with rooms) */}
                    {(listing.bedrooms ||
                      listing.bathrooms ||
                      listing.size) && (
                      <div className="text-xs text-gray-500 mt-2 flex gap-4">
                        {listing.bedrooms && (
                          <span>🛏 {listing.bedrooms} bd</span>
                        )}
                        {listing.bathrooms && (
                          <span>🛁 {listing.bathrooms} ba</span>
                        )}
                        {listing.size && <span>📐 {listing.size}</span>}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="max-w-6xl mx-auto flex justify-center mt-8 gap-2">
          {/* Prev */}
          <Button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            variant={currentPage === 1 ? "secondary" : "primary"}
          >
            Prev
          </Button>

          {/* Numbers */}
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              onClick={() => goToPage(i + 1)}
              variant={currentPage === i + 1 ? "primary" : "secondary"}
            >
              {i + 1}
            </Button>
          ))}

          {/* Next */}
          <Button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant={currentPage === totalPages ? "secondary" : "primary"}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Listings;
