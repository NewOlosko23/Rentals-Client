import React from "react";
import { Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[95vh] flex items-center justify-center bg-gray-100">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Discover Your <span className="text-indigo-400">Dream Home</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          Buy, rent or lease properties with ease. Thousands of listings across
          Kenya.
        </p>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/listings"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/90 text-gray-900 px-6 py-3 font-medium shadow hover:bg-white transition"
          >
            <Search className="h-5 w-5" />
            Find Your Home
          </Link>
          <Link
            to="/dashboard/post"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 text-white px-6 py-3 font-medium shadow hover:bg-black transition"
          >
            <Plus className="h-5 w-5" />
            Post Property
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
