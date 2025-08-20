import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I list my property?",
    answer:
      "Listing your property is simple and only takes a few minutes. After signing up or logging in, navigate to the 'Add Property' section in your dashboard. Fill in details like type, price, location, description, and upload images. Once submitted, our team reviews it quickly to ensure it meets guidelines. After approval, your listing goes live and reaches potential renters or buyers, helping you get serious inquiries faster.",
  },
  {
    question: "Can I edit my property listing later?",
    answer:
      "Yes, you can edit any of your active listings from your dashboard at any time.",
  },
  {
    question: "How does the rent/lease process work?",
    answer:
      "Interested renters contact you directly via the platform. You can negotiate terms, sign agreements, and collect payments offline or via integrated services.",
  },
  {
    question: "Are there fees for listing a property?",
    answer:
      "Our platform allows free basic listings. Premium listings or featured placements may incur a fee.",
  },
  {
    question: "How can I search for properties efficiently?",
    answer:
      "Use our advanced search with filters for location, price, property type, and amenities to quickly find what you need.",
  },
  {
    question: "What happens after I remove a listing?",
    answer:
      "Once you remove a listing, it will no longer appear publicly. You can reactivate it anytime from your dashboard.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // first FAQ open by default

  const toggleIndex = (index) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <section
      className="relative py-20 px-6 bg-center bg-cover bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-14 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-200 text-md max-w-2xl mx-auto">
            Everything you need to know about listing, renting, buying, or
            leasing properties on our platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-90 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center px-6 py-5 focus:outline-none text-left"
                onClick={() => toggleIndex(index)}
              >
                <span className="text-gray-900 font-medium text-md">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-700 leading-relaxed text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
