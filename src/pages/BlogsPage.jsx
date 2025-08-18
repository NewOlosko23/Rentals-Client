import React from "react";
import { useParams, Link } from "react-router-dom";
import blogPosts from "../data/blogs";

const BlogsPage = () => {
  const { id } = useParams();
  const blog = blogPosts.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 text-center mt-14">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Blog Not Found
        </h2>
        <Link to="/blogs" className="text-indigo-600 hover:underline">
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 mt-14">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{blog.title}</h1>
      <p className="text-gray-700 whitespace-pre-line">{blog.content}</p>

      <div className="mt-8">
        <Link to="/blogs" className="text-indigo-600 hover:underline">
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogsPage;
