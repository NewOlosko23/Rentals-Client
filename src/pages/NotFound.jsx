import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="mb-6 text-center max-w-md text-gray-600">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
