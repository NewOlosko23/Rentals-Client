import React from "react";
import { Link } from "react-router-dom";
import { Image } from "lucide-react";
import { mockListings } from "../../data/Listings";

const PLACEHOLDER =
  "https://via.placeholder.com/1200x800.png?text=No+Image+Available";

const Listings = () => {
  const visible = mockListings.slice(0, 6);

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
          {visible.map((item) => {
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
              item.type && item.type.toLowerCase() === "rent"
                ? `KES ${priceNumber.toLocaleString()} / month`
                : `KES ${priceNumber.toLocaleString()}`;

            return (
              <Link
                to={`/listing/${(item.type || "listing").toLowerCase()}/${
                  item.id
                }`}
                key={item.id}
                className="group bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="relative w-full h-48">
                  <img
                    src={firstImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {imageCount > 1 && (
                    <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Image className="w-3 h-3" />
                      <span>{imageCount}</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                    {item.title}
                  </h3>

                  <p className="text-indigo-600 font-bold mt-2">{priceLabel}</p>

                  <p className="text-gray-500 text-sm mb-3">{item.location}</p>

                  <p className="inline-block px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition">
                    {item.type
                      ? item.type.charAt(0).toUpperCase() + item.type.slice(1)
                      : "Listing"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View More Button */}
        <div className="mt-10 text-center">
          <Link
            to="/listings"
            className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
          >
            View More Listings
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Listings;
