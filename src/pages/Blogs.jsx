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
    <div className="max-w-6xl mx-auto px-6 py-12 mt-14">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
        Our Blogs
      </h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search blogs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-10 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />

      {/* Blogs Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((post) => (
            <div
              key={post.id}
              className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300 flex flex-col p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                {post.title}
              </h3>
              <div className="text-gray-400 text-sm mb-3 flex justify-between">
                <span>By {post.author}</span>
                <span>{post.date}</span>
              </div>
              <p className="text-gray-600 mb-6 text-sm line-clamp-5">
                {post.content.substring(0, 300)}...
              </p>
              <div className="mt-auto">
                <Link
                  to={`/blogs/${post.id}`}
                  className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700 transition"
                >
                  Read More
                  <span className="ml-1">→</span>
                </Link>
              </div>
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
