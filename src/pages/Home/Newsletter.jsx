import React, { useState, useEffect } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed || !email) return;
    setSubmitted(true);
    setEmail("");
    setAgreed(false);
    setShowMessage(true);
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
        setSubmitted(false);
      }, 3000); // message shows for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600">
          Stay updated with the latest properties, tips, and offers.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-4"
      >
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            required
          />
          <p className="text-gray-600 text-sm">
            I agree to receive newsletters and accept the terms.
          </p>
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-6 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition ${
            !agreed || !email ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!agreed || !email}
        >
          Subscribe
        </button>

        {/* Animated confirmation message */}
        <p
          className={`mt-2 text-center font-medium text-green-600 transition-opacity duration-500 ${
            showMessage ? "opacity-100" : "opacity-0"
          }`}
        >
          Thank you for subscribing!
        </p>
      </form>
    </section>
  );
};

export default Newsletter;
