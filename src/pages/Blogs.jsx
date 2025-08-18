import React, { useState } from "react";
import { Link } from "react-router-dom";
import blogPosts from "../data/blogs";

const Blogs = () => {
  const [search, setSearch] = useState("");

  const filteredBlogs = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 mt-14">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Blogs</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search blogs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-8 border rounded-xl focus:ring-2 focus:ring-indigo-500"
      />

      {/* Blogs Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-4">{post.summary}</p>
              <Link
                to={`/blogs/${post.id}`}
                className="text-indigo-600 font-semibold hover:underline"
              >
                Read More →
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No blogs found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
