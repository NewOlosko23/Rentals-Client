import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {visible && (
        <div
          onClick={scrollToTop}
          className="fixed z-99 bottom-6 right-6 bg-gray-800 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-gray-700 transition"
        >
          <ArrowUp size={20} />
        </div>
      )}
    </>
  );
};

export default BackToTop;
