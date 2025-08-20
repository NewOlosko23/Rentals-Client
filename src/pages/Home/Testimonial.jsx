import React from "react";
import Slider from "react-slick";
import { Star } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "John Mwangi",
    role: "Homeowner",
    message:
      "This platform made finding my dream home so easy. The search tools and filters worked perfectly, and I connected with a seller within days. Highly recommended for anyone looking to buy or rent quickly and with confidence.",
    rating: 5,
  },
  {
    name: "Mary Wanjiku",
    role: "Investor",
    message:
      "I was able to buy and lease properties seamlessly. The platform’s user interface is intuitive, and the support team was always ready to help. Excellent service for both short-term and long-term investments.",
    rating: 4,
  },
  {
    name: "Peter Otieno",
    role: "Tenant",
    message:
      "Renting a property has never been simpler. From browsing listings to contacting landlords, the process was smooth from start to finish. I found a perfect apartment within my budget in less than a week.",
    rating: 5,
  },
];

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
          What Our Users Say
        </h2>
        <p className="text-gray-600 text-md">
          Hear from people who have successfully found their dream properties
          using our platform.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-md border border-gray-200 p-10 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <p className="text-gray-700 text-md leading-relaxed mb-6 italic">
                “{t.message}”
              </p>

              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < t.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill={i < t.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>

              {/* Author */}
              <div className="text-center">
                <p className="text-gray-900 font-semibold">{t.name}</p>
                <p className="text-gray-500 text-sm">{t.role}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonial;
