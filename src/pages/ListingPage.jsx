import { useParams } from "react-router-dom";
import { useState } from "react";
import { mockListings } from "../data/Listings";
import Button from "../components/Button";
import { Bed, Bath, Ruler, MapPin, Building2, Heart } from "lucide-react";

const ListingPage = () => {
  const { id, transactionType } = useParams();

  const listing = mockListings.find(
    (item) =>
      item.id === parseInt(id) &&
      item.transactionType?.toLowerCase() === transactionType?.toLowerCase()
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!listing) {
    return (
      <div className="text-center py-16 text-gray-600 text-lg font-medium">
        Listing not found
      </div>
    );
  }

  const images = listing.images || [listing.image];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      {/* Image carousel */}
      <div className="relative w-full h-[420px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
        <img
          src={images[currentIndex]}
          alt={`${listing.title} ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900/90 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition transform hover:scale-110"
            >
              ‹
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900/90 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition transform hover:scale-110"
            >
              ›
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 right-4 bg-gray-900/75 text-white text-sm px-3 py-1 rounded-full shadow">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Listing details */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Header */}
          <div>
            <p className="inline-flex items-center gap-2 rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-300 bg-transparent hover:bg-gray-100  py-1 px-3 text-indigo-700 font-bold">
              {listing.transactionType}
            </p>
            <h1 className="text-xl font-bold text-gray-900">{listing.title}</h1>
            <p className="flex items-center gap-2 text-md text-gray-600 mt-2">
              <MapPin className="w-5 h-5 text-indigo-600" />
              {listing.address}, {listing.estate}, {listing.city}
            </p>
            <p className="text-md text-indigo-700 font-semibold mt-4">
              {listing.transactionType?.toLowerCase() === "rent"
                ? `KES ${listing.price.toLocaleString()} / month`
                : `KES ${listing.price.toLocaleString()}`}
            </p>
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 p-5 rounded-xl shadow-sm">
            <div className="flex flex-col items-center text-center">
              <Bed className="w-6 h-6 text-gray-700" />
              <span className="font-semibold text-gray-900">
                {listing.bedrooms || "N/A"}
              </span>
              <span className="text-sm text-gray-500">Bedrooms</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Bath className="w-6 h-6 text-gray-700" />
              <span className="font-semibold text-gray-900">
                {listing.bathrooms || "N/A"}
              </span>
              <span className="text-sm text-gray-500">Bathrooms</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Ruler className="w-6 h-6 text-gray-700" />
              <span className="font-semibold text-gray-900">
                {listing.size || "N/A"}
              </span>
              <span className="text-sm text-gray-500">Size</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Building2 className="w-6 h-6 text-gray-700" />
              <span className="font-semibold text-gray-900">
                {listing.category}
              </span>
              <span className="text-sm text-gray-500">Category</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              {listing.description ||
                "This property offers great amenities and is located in a prime area."}
            </p>
          </div>

          {/* Amenities */}
          {listing.amenities && listing.amenities.length > 0 && (
            <div className="my-4 py-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Amenities
              </h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {listing.amenities.map((amenity, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-100 w-full text-center hover:bg-gray-200 transition px-3 py-2 rounded-lg text-sm text-gray-700 font-medium shadow-sm"
                  >
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Contact Box */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Lister
            </h2>
            <form className="space-y-4">
              <textarea
                placeholder="Write a message to the lister..."
                rows="4"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              ></textarea>
              <Button className="w-full bg-gray-900 text-white hover:bg-black rounded-lg">
                Send Message
              </Button>
            </form>
          </div>

          {/* Stats           <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Stats</h2>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>👀 Views: {listing.stats?.views || 0}</li>
              <li className="flex items-center">
                <Heart className="inline w-4 h-4 mr-2 text-red-500" />
                Saves: {listing.stats?.saves || 0}
              </li>
              <li>📩 Inquiries: {listing.stats?.inquiries || 0}</li>
            </ul>
          </div> */}
        </aside>
      </div>
    </div>
  );
};

export default ListingPage;
