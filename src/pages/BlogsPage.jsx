import React from "react";
import { useParams, Link } from "react-router-dom";
import blogPosts from "../data/blogs";

const BlogsPage = () => {
  const { id } = useParams();
  const blog = blogPosts.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Blog Not Found
        </h2>
        <Link
          to="/blogs"
          className="text-indigo-600 font-medium hover:text-indigo-700 transition"
        >
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 mt-14">
      <h1 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
        {blog.title}
      </h1>

      {/* Author & Date */}
      <div className="text-gray-400 text-sm mb-8 flex justify-between">
        <span>By {blog.author}</span>
        <span>{blog.date}</span>
      </div>

      {/* Blog Content */}
      <div className="prose prose-indigo max-w-none text-gray-700">
        <p>{blog.content}</p>
      </div>

      {/* Back Link */}
      <div className="mt-12">
        <Link
          to="/blogs"
          className="text-indigo-600 font-medium hover:text-indigo-700 transition"
        >
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogsPage;
