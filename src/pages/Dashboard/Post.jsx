import React, { useState } from "react";
import { Upload, X } from "lucide-react";

const categories = {
  residential: [
    "bedsitter",
    "1br",
    "2br",
    "3br",
    "apartment",
    "house",
    "airbnb",
    "hotel",
  ],
  commercial: [
    "office",
    "stall",
    "shop",
    "warehouse",
    "empty_space",
    "building",
  ],
  land: ["plot", "agricultural", "industrial", "other"],
};

export default function PostProperty() {
  const [purpose, setPurpose] = useState("residential");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 10)
      return alert("Max 10 images allowed");
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    images.forEach((img) => formData.append("images", img));
    console.log("Form submitted");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8 mt-24">
      <h2 className="text-xl font-semibold tracking-tight text-gray-900 mb-2">
        Post a Property
      </h2>
      <h3 className="text-gray-600 mb-6 text-sm">
        Welcome! Share your property details and get your listing in front of
        thousands of potential buyers and renters. Posting is quick, easy, and
        helps your property get discovered faster.
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Title</label>
          <p className="text-sm text-gray-500 text-sm">
            Give your property a short, clear title (e.g. “Modern 2BR Apartment
            in Kilimani”).
          </p>
          <input
            name="title"
            required
            className="w-full border rounded-lg p-2 focus:ring focus:ring-gray-200"
          />
        </div>

        {/* Transaction Type */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700 text-sm">
            Transaction Type
          </label>
          <p className="text-sm text-gray-500">
            Select whether the property is for rent, sale, or lease.
          </p>
          <select
            name="transactionType"
            required
            className="w-full border rounded-lg p-2 text-sm"
          >
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
            <option value="lease">Lease</option>
          </select>
        </div>

        {/* Purpose */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Purpose</label>
          <p className="text-sm text-gray-500">
            Choose the property type category.
          </p>
          <select
            name="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="land">Land</option>
          </select>
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Category</label>
          <p className="text-sm text-gray-500">
            Pick the most accurate category for your listing.
          </p>
          <select
            name="category"
            required
            className="w-full border rounded-lg p-2"
          >
            {categories[purpose].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Price (KES)</label>
          <p className="text-sm text-gray-500">
            Enter the asking price or monthly rent in Kenyan Shillings.
          </p>
          <input
            type="number"
            name="price"
            required
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="block font-medium text-gray-700">City</label>
            <p className="text-sm text-gray-500">
              Main city or town (e.g. Nairobi).
            </p>
            <input name="city" className="w-full border rounded-lg p-2" />
          </div>
          <div className="space-y-1">
            <label className="block font-medium text-gray-700">Estate</label>
            <p className="text-sm text-gray-500">
              Estate or neighborhood name.
            </p>
            <input name="estate" className="w-full border rounded-lg p-2" />
          </div>
          <div className="space-y-1">
            <label className="block font-medium text-gray-700">Address</label>
            <p className="text-sm text-gray-500">
              Specific street or plot address.
            </p>
            <input name="address" className="w-full border rounded-lg p-2" />
          </div>
        </div>

        {/* Bedrooms & Bathrooms (only for residential) */}
        {purpose === "residential" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-medium text-gray-700">
                Bedrooms
              </label>
              <p className="text-sm text-gray-500">Number of bedrooms.</p>
              <input
                type="number"
                name="bedrooms"
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-medium text-gray-700">
                Bathrooms
              </label>
              <p className="text-sm text-gray-500">Number of bathrooms.</p>
              <input
                type="number"
                name="bathrooms"
                className="w-full border rounded-lg p-2"
              />
            </div>
          </div>
        )}

        {/* Size */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Size</label>
          <p className="text-sm text-gray-500">
            Enter land or house size (e.g. 200 sqm, 1/8 acre).
          </p>
          <input
            name="size"
            placeholder="e.g. 200 sqm or 1/8 acre"
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Amenities */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Amenities</label>
          <p className="text-sm text-gray-500">
            Separate with commas (e.g. parking, wifi, pool).
          </p>
          <input
            name="amenities"
            placeholder="parking, wifi, pool"
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Description</label>
          <p className="text-sm text-gray-500">
            Provide more details about the property.
          </p>
          <textarea
            name="description"
            rows="4"
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Images</label>
          <p className="text-sm text-gray-500">
            Upload up to 10 images showcasing the property.
          </p>
          <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="images"
            />
            <label
              htmlFor="images"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="w-6 h-6 mb-2 text-gray-500" />
              <span className="text-gray-600">Click to upload (max 10)</span>
            </label>
          </div>

          {/* Preview */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {images.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-white p-1 rounded-full shadow hover:bg-red-100"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full bg-gray-800 cursor-pointer text-white py-3 rounded-lg hover:bg-gray-900 transition"
          >
            Post Property
          </button>
        </div>
      </form>
    </div>
  );
}
