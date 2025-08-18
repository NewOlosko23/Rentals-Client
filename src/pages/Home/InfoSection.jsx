import React from "react";
import { Home, Key, Handshake } from "lucide-react";

const InfoSection = () => {
  const options = [
    {
      id: 1,
      title: "Buy",
      description:
        "Find your dream home effortlessly. Browse verified listings, compare options, and close deals with ease.",
      icon: <Home className="w-10 h-10 text-indigo-600" />,
    },
    {
      id: 2,
      title: "Rent",
      description:
        "Looking for a place to stay? Quickly search rental properties that match your budget and lifestyle.",
      icon: <Key className="w-10 h-10 text-indigo-600" />,
    },
    {
      id: 3,
      title: "Lease",
      description:
        "We make leasing straightforward with transparent terms, flexible options, and trusted property owners.",
      icon: <Handshake className="w-10 h-10 text-indigo-600" />,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          Everything should be this easy...
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {options.map((option) => (
            <div
              key={option.id}
              className="bg-white shadow-md rounded-2xl p-8 hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-6">{option.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {option.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
