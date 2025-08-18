import { useParams } from "react-router-dom";
import { useState } from "react";
import { mockListings } from "../data/Listings";

const ListingPage = () => {
  const { id, type } = useParams();
  const listing = mockListings.find(
    (item) =>
      item.id === parseInt(id) && item.type.toLowerCase() === type.toLowerCase()
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!listing) {
    return (
      <div className="text-center py-10 text-gray-600">Listing not found</div>
    );
  }

  const images = listing.images || [listing.image]; // support both single or multiple

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-14">
      {/* Image carousel */}
      <div className="relative w-full h-[400px]">
        <img
          src={images[currentIndex]}
          alt={`${listing.title} ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded-2xl shadow-lg"
        />

        {/* Prev button */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 px-3 py-2 rounded-full shadow"
            >
              ‹
            </button>

            {/* Next button */}
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 px-3 py-2 rounded-full shadow"
            >
              ›
            </button>

            {/* Image counter */}
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Listing details */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>
        <p className="text-lg text-gray-600 mt-2">{listing.location}</p>
        <p className="text-2xl text-blue-600 font-semibold mt-4">
          {listing.type === "Rent"
            ? `KES ${listing.price.toLocaleString()} / month`
            : `KES ${listing.price.toLocaleString()}`}
        </p>
        <p className="mt-4 text-gray-700">
          This is a detailed description of the property. You can add more
          details such as number of bedrooms, bathrooms, square footage,
          amenities, and more.
        </p>
        <div className="mt-6">
          <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">
            Type: {listing.type}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
