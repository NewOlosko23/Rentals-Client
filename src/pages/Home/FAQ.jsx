import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I list my property?",
    answer:
      "Sign up or log in, go to 'Add Property', fill in details including type, price, location, and images, then submit for review.",
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
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600">
          Everything you need to know about listing, renting, buying, or leasing
          properties on our platform.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <button
              className="w-full flex justify-between items-center p-6 focus:outline-none"
              onClick={() => toggleIndex(index)}
            >
              <span className="text-lg font-medium text-gray-900">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
