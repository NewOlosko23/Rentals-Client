import { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import axios from "axios";

const categoriesData = {
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
  const [formValues, setFormValues] = useState({
    title: "",
    transactionType: "rent",
    purpose: "residential",
    category: "bedsitter",
    price: "",
    city: "",
    estate: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    size: "",
    amenities: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ensure category resets when purpose changes
  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      category: categoriesData[formValues.purpose][0],
    }));
  }, [formValues.purpose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 10)
      return alert("Max 10 images allowed");
    setImages([...images, ...files]);
  };

  const removeImage = (index) =>
    setImages(images.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) return alert("You must be logged in");

    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) =>
      formData.append(key, value)
    );
    images.forEach((img) => formData.append("images", img));

    try {
      setLoading(true);
      const response = await axios.post(
        "https://rentals-server.onrender.com/api/properties",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Property posted successfully!");
      // Reset form
      setFormValues({
        title: "",
        transactionType: "rent",
        purpose: "residential",
        category: "bedsitter",
        price: "",
        city: "",
        estate: "",
        address: "",
        bedrooms: "",
        bathrooms: "",
        size: "",
        amenities: "",
        description: "",
      });
      setImages([]);
      console.log(formData);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to post property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8 mt-24">
      <h2 className="text-xl font-semibold tracking-tight text-gray-900 mb-2">
        Post a Property
      </h2>
      <h3 className="text-gray-600 mb-6 text-sm">
        Share your property details to get your listing in front of thousands of
        potential buyers and renters.
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Title</label>
          <input
            name="title"
            value={formValues.title}
            onChange={handleChange}
            required
            placeholder="Modern 2BR Apartment in Kilimani"
            className="w-full border rounded-lg p-2 focus:ring focus:ring-gray-200"
          />
          <p className="text-gray-500 text-sm">
            Give your property a short, clear title (e.g., "Modern 2BR Apartment
            in Kilimani").
          </p>
        </div>

        {/* Transaction Type */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">
            Transaction Type
          </label>
          <select
            name="transactionType"
            value={formValues.transactionType}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
            <option value="lease">Lease</option>
          </select>
          <p className="text-gray-500 text-sm">
            Select whether the property is for rent, sale, or lease.
          </p>
        </div>

        {/* Purpose */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Purpose</label>
          <select
            name="purpose"
            value={formValues.purpose}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="land">Land</option>
          </select>
          <p className="text-gray-500 text-sm">
            Choose the property type category: residential, commercial, or land.
          </p>
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formValues.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            {categoriesData[formValues.purpose].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <p className="text-gray-500 text-sm">
            Pick the most accurate category for your listing based on the
            purpose.
          </p>
        </div>

        {/* Price */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Price (KES)</label>
          <input
            type="number"
            name="price"
            value={formValues.price}
            onChange={handleChange}
            required
            placeholder="e.g. 15000"
            className="w-full border rounded-lg p-2"
          />
          <p className="text-gray-500 text-sm">
            Enter the asking price or monthly rent in Kenyan Shillings (KES).
          </p>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="block font-medium text-gray-700">City</label>
            <input
              name="city"
              value={formValues.city}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
            <p className="text-gray-500 text-sm">
              Specify the main city or town where the property is located.
            </p>
          </div>
          <div className="space-y-1">
            <label className="block font-medium text-gray-700">Estate</label>
            <input
              name="estate"
              value={formValues.estate}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
            <p className="text-gray-500 text-sm">
              Enter the estate, neighborhood, or development name.
            </p>
          </div>
          <div className="space-y-1">
            <label className="block font-medium text-gray-700">Address</label>
            <input
              name="address"
              value={formValues.address}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
            <p className="text-gray-500 text-sm">
              Provide the specific street or plot address of the property.
            </p>
          </div>
        </div>

        {/* Bedrooms & Bathrooms */}
        {formValues.purpose === "residential" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-medium text-gray-700">
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                value={formValues.bedrooms}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
              <p className="text-gray-500 text-sm">
                Enter the number of bedrooms (residential properties only).
              </p>
            </div>
            <div className="space-y-1">
              <label className="block font-medium text-gray-700">
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                value={formValues.bathrooms}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
              <p className="text-gray-500 text-sm">
                Enter the number of bathrooms (residential properties only).
              </p>
            </div>
          </div>
        )}

        {/* Size */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Size</label>
          <input
            name="size"
            value={formValues.size}
            onChange={handleChange}
            placeholder="e.g. 200 sqm or 1/8 acre"
            className="w-full border rounded-lg p-2"
          />
          <p className="text-gray-500 text-sm">
            Enter the land or house size (e.g., 200 sqm, 1/8 acre).
          </p>
        </div>

        {/* Amenities */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Amenities</label>
          <input
            name="amenities"
            value={formValues.amenities}
            onChange={handleChange}
            placeholder="parking, wifi, pool"
            className="w-full border rounded-lg p-2"
          />
          <p className="text-gray-500 text-sm">
            List any amenities separated by commas (e.g., parking, wifi, pool).
          </p>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formValues.description}
            onChange={handleChange}
            rows="4"
            placeholder="Provide more details about the property"
            className="w-full border rounded-lg p-2"
          />
          <p className="text-gray-500 text-sm">
            Provide a detailed description of the property, highlighting key
            features.
          </p>
        </div>

        {/* Images */}
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Images</label>
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
            className="cursor-pointer flex flex-col items-center border-2 border-dashed rounded-lg p-6 hover:bg-gray-50"
          >
            <Upload className="w-6 h-6 mb-2 text-gray-500" />
            <span className="text-gray-600">Click to upload (max 10)</span>
          </label>
          <p className="text-gray-500 text-sm">
            Upload up to 10 images showcasing your property.
          </p>

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
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-800 hover:bg-gray-900"
          } text-white py-3 rounded-lg transition`}
        >
          {loading ? "Posting..." : "Post Property"}
        </button>
      </form>
    </div>
  );
}
