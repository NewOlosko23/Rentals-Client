import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const token = user ? user.token : null;

  const [form, setForm] = useState({
    title: "",
    type: "",
    category: "",
    price: "",
    city: "",
    estate: "",
    bedrooms: "",
    bathrooms: "",
    size: "",
    amenities: "",
    description: "",
  });

  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!token) navigate("/login");
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!token) {
      navigate("/login");
      return;
    }

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    for (let i = 0; i < files.length; i++) {
      data.append("files", files[i]);
    }

    try {
      const res = await fetch(
        "https://rentals-server.onrender.com/api/properties",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: data,
        }
      );
      const result = await res.json();
      if (res.ok) {
        alert("✅ Property created successfully!");
        navigate("/dashboard");
      } else {
        alert(result.message || "❌ Failed to create property");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-28">
      {/* Stepper */}
      <div className="flex justify-between mb-8">
        {["Basic Info", "Details", "Media"].map((label, index) => (
          <div
            key={index}
            className={`flex-1 text-center pb-2 border-b-4 ${
              step === index + 1
                ? "border-indigo-600 text-indigo-600 font-semibold"
                : "border-gray-200 text-gray-500"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1 - Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <input
              type="text"
              name="title"
              placeholder="Property Title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
              required
            />
            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                name="type"
                placeholder="Type (e.g., Apartment)"
                value={form.type}
                onChange={handleChange}
                className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="category"
                placeholder="Category (e.g., Rent, Sale)"
                value={form.category}
                onChange={handleChange}
                className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 2 - Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="estate"
                placeholder="Estate"
                value={form.estate}
                onChange={handleChange}
                className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="grid grid-cols-3 gap-6">
              <input
                type="number"
                name="bedrooms"
                placeholder="Bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
                className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="number"
                name="bathrooms"
                placeholder="Bathrooms"
                value={form.bathrooms}
                onChange={handleChange}
                className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="number"
                name="size"
                placeholder="Size (sqft)"
                value={form.size}
                onChange={handleChange}
                className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <input
              type="text"
              name="amenities"
              placeholder="Amenities (comma separated)"
              value={form.amenities}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 - Media & Submit */}
        {step === 3 && (
          <div className="space-y-6">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full p-3 border rounded-xl bg-gray-50"
            />
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Property"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Post;
