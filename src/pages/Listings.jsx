import React, { useState } from "react";
import { MapPin, Home, X, Search, Image } from "lucide-react";
import { Link } from "react-router-dom";
import { mockListings } from "../data/Listings";

const PLACEHOLDER =
  "https://via.placeholder.com/1200x800.png?text=No+Image+Available";

const Listings = () => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredListings, setFilteredListings] = useState(mockListings);
  const [currentPage, setCurrentPage] = useState(1);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ITEMS_PER_PAGE = 15;
  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);

  const handleSearch = () => {
    const results = mockListings.filter((listing) => {
      const matchesLocation = location
        ? listing.location?.toLowerCase().includes(location.toLowerCase())
        : true;
      const matchesType = type ? listing.type === type : true;
      const matchesPrice =
        (minPrice ? listing.price >= minPrice : true) &&
        (maxPrice ? listing.price <= maxPrice : true);
      return matchesLocation && matchesType && matchesPrice;
    });
    setFilteredListings(results);
    setCurrentPage(1);
  };

  const handleAroundMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        alert(`Your coordinates: Latitude ${latitude}, Longitude ${longitude}`);
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
        <div className="flex justify-between items-center mt-6 flex-wrap gap-3">
          <button
            onClick={handleAroundMe}
            className="px-5 py-2 rounded-lg cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Around Me
          </button>

          <div className="flex gap-3">
            <button
              onClick={clearFilters}
              className="flex items-center cursor-pointer gap-2 px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
            <button
              onClick={handleSearch}
              className="flex items-center cursor-pointer gap-2 px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
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
            // normalize images
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
              listing.type === "Rent"
                ? `KES ${Number(listing.price).toLocaleString()} / month`
                : `KES ${Number(listing.price).toLocaleString()}`;

            return (
              <Link
                to={`/listing/${listing.type?.toLowerCase()}/${listing.id}`}
                key={listing.id}
                className="block transform transition duration-300 hover:scale-105"
              >
                <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:bg-gray-50 cursor-pointer relative">
                  <img
                    src={firstImage}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />

                  {imageCount > 1 && (
                    <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Image className="w-3 h-3" />
                      <span>{imageCount}</span>
                    </div>
                  )}

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {listing.title}
                    </h3>
                    <p className="text-gray-500">{listing.location}</p>
                    <p className="text-blue-600 font-bold mt-2">{priceLabel}</p>
                    <span className="text-sm text-gray-600">
                      Type: {listing.type}
                    </span>
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
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === i + 1
                  ? "bg-indigo-700 text-white"
                  : "bg-gray-200 hover:bg-indigo-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Listings;
