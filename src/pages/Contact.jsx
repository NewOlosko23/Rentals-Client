import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 mt-14">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Get in Touch</h1>
          <p className="text-gray-500 mt-2">
            We'd love to hear from you! Reach out using the options below.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Mail className="h-10 w-10 text-indigo-500 mb-3" />
            <h3 className="text-lg font-semibold text-gray-700">Email</h3>
            <p className="text-gray-500">support@houseconnect.com</p>
          </div>
          <div className="flex flex-col items-center">
            <Phone className="h-10 w-10 text-green-500 mb-3" />
            <h3 className="text-lg font-semibold text-gray-700">Phone</h3>
            <p className="text-gray-500">+254 711 111 111</p>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="h-10 w-10 text-red-500 mb-3" />
            <h3 className="text-lg font-semibold text-gray-700">Location</h3>
            <p className="text-gray-500">Nairobi, Kenya</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Send us a Message
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Subject"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 md:col-span-2"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 md:col-span-2"
            ></textarea>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition md:col-span-2"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Socials */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Follow us on social media</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-gray-500 hover:text-indigo-600">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-400">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-500 hover:text-pink-600">
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
