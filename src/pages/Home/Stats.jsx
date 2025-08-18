import React from "react";
import { Home, Users, MapPin } from "lucide-react";

const Stats = () => {
  return (
    <section
      className="relative py-20 px-6 bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80')",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative max-w-4xl mx-auto text-center text-white">
        {/* Title + Description */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Growing Every Day 🚀
        </h2>
        <p className="text-gray-200 mb-12">
          Our platform is rapidly expanding, connecting people to their dream
          homes across Kenya. Here’s a glimpse of what we’ve achieved so far.
        </p>

        {/* Stats Card */}
        <div className="p-8 bg-white rounded-2xl shadow-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Our Reach
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Properties */}
            <div className="flex flex-col items-center">
              <div className="p-4 bg-indigo-100 rounded-xl mb-3">
                <Home className="text-indigo-600 w-8 h-8" />
              </div>
              <p className="text-2xl font-bold text-gray-900">1,200+</p>
              <span className="text-gray-600 text-sm">Properties Listed</span>
            </div>

            {/* Agents */}
            <div className="flex flex-col items-center">
              <div className="p-4 bg-green-100 rounded-xl mb-3">
                <Users className="text-green-600 w-8 h-8" />
              </div>
              <p className="text-2xl font-bold text-gray-900">300+</p>
              <span className="text-gray-600 text-sm">Registered Agents</span>
            </div>

            {/* Locations */}
            <div className="flex flex-col items-center">
              <div className="p-4 bg-pink-100 rounded-xl mb-3">
                <MapPin className="text-pink-600 w-8 h-8" />
              </div>
              <p className="text-2xl font-bold text-gray-900">25+</p>
              <span className="text-gray-600 text-sm">Locations in Kenya</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
