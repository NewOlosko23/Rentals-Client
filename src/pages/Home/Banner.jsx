import React from "react";

const Banner = () => {
  return (
    <section className="bg-indigo-600 text-white py-20 px-6 text-center rounded-lg shadow-lg mx-6 my-12">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Find Your Dream Property Today
      </h2>
      <p className="text-lg md:text-xl mb-6">
        Browse, list, lease, or rent properties easily with our seamless
        platform.
      </p>
      <a
        href="#listings"
        className="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-full shadow-md hover:bg-gray-100 transition"
      >
        Get Started
      </a>
    </section>
  );
};

export default Banner;
