import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">House Connect</h3>
          <p className="text-gray-400">
            Connecting you with the best properties in Kenya. Buy, rent, or
            lease with ease and confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/listings" className="hover:text-white transition">
                Listings
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-white transition">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/faq" className="hover:text-white transition">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/guides" className="hover:text-white transition">
                Guides
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-white transition">
                Support
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p className="text-gray-400">Email: info@houseconnect.com</p>
          <p className="text-gray-400">Phone: +254 700 000 000</p>
          <p className="text-gray-400 mt-2">Address: Nairobi, Kenya</p>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} House Connect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
