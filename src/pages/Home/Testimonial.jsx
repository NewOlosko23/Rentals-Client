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
      "This platform made finding my dream home so easy. Highly recommended!",
    rating: 5,
  },
  {
    name: "Mary Wanjiku",
    role: "Investor",
    message:
      "I was able to buy and lease properties seamlessly. Excellent service!",
    rating: 4,
  },
  {
    name: "Peter Otieno",
    role: "Tenant",
    message:
      "Renting a property has never been simpler. Smooth process from start to finish.",
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
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          What Our Users Say
        </h2>
        <p className="text-gray-600">
          Hear from people who have successfully found their dream properties
          using our platform.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg">
              <p className="text-gray-700 text-lg mb-4">"{t.message}"</p>
              <div className="flex items-center justify-center mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-900 font-semibold">{t.name}</p>
              <p className="text-gray-500 text-sm">{t.role}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonial;
