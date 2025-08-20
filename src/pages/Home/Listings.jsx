import React from "react";
import { Link } from "react-router-dom";
import { Image } from "lucide-react";
import { mockListings } from "../../data/Listings";
import Button from "../../components/Button";

const PLACEHOLDER =
  "https://via.placeholder.com/1200x800.png?text=No+Image+Available";

const Listings = () => {
  const listings = mockListings.slice(0, 6);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Trending Listings
          </h2>
          <Link
            to="/listings"
            className="text-indigo-600 font-medium hover:underline"
          >
            View More
          </Link>
        </div>

        {/* Properties Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((item) => {
            // normalize images into an array
            const images = Array.isArray(item.images)
              ? item.images
              : item.image
              ? [item.image]
              : item.img
              ? [item.img]
              : [];

            const firstImage = images[0] || PLACEHOLDER;
            const imageCount = images.length;

            // safe price formatting
            const priceNumber =
              typeof item.price === "number"
                ? item.price
                : Number(item.price) || 0;

            const priceLabel =
              item.transactionType &&
              item.transactionType.toLowerCase() === "rent"
                ? `KES ${priceNumber.toLocaleString()} / month`
                : `KES ${priceNumber.toLocaleString()}`;

            return (
              <Link
                to={`/listing/${item.transactionType?.toLowerCase()}/${
                  item.id
                }`}
                key={item.id}
                className="block transform transition duration-300 hover:scale-105"
              >
                <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:bg-gray-50 cursor-pointer relative">
                  {/* Always show only the first image */}
                  <div className="relative w-full h-48">
                    <img
                      src={firstImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Badge for number of images */}
                    {imageCount > 1 && (
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Image className="w-3 h-3" />
                        <span>{imageCount} Photos</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-2">
                    {/* Title */}
                    <h3 className="text-md font-semibold text-gray-800">
                      {item.title}
                    </h3>

                    {/* Estate & City */}
                    <p className="text-gray-600 text-sm">
                      {item.estate}, {item.city}
                    </p>

                    {/* Address */}
                    <p className="text-gray-500 text-xs italic">
                      {item.address}
                    </p>

                    {/* Price */}
                    <p className="text-indigo-600 font-bold mt-2 text-sm">
                      {priceLabel}
                    </p>

                    {/* Tags Row */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs text-gray-700 border rounded-2xl px-2 py-1 bg-gray-50">
                        {item.transactionType}
                      </span>
                      <span className="text-xs text-gray-700 border rounded-2xl px-2 py-1 bg-gray-50">
                        {item.purpose}
                      </span>
                      <span className="text-xs text-gray-700 border rounded-2xl px-2 py-1 bg-gray-50">
                        {item.category}
                      </span>
                    </div>

                    {/* Optional quick stats (if residential with rooms) */}
                    {(item.bedrooms || item.bathrooms || item.size) && (
                      <div className="text-xs text-gray-500 mt-2 flex gap-4">
                        {item.bedrooms && <span>🛏 {item.bedrooms} bd</span>}
                        {item.bathrooms && <span>🛁 {item.bathrooms} ba</span>}
                        {item.size && <span>📐 {item.size}</span>}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View More Button */}
        <div className="mt-10 text-center">
          <Link to="/listings">
            <Button size="lg" variant="primary" className="cursor-pointer">
              View More Listings
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Listings;
