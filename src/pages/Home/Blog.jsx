import { Link } from "react-router-dom";
import blogPosts from "../../data/blogs";

const Blog = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
          Guides & Tips
        </h2>
        <p className="text-gray-500 text-md max-w-xl mx-auto">
          Everything you need to know to list, rent, lease, or buy properties
          using our platform.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {blogPosts.map((post, idx) => (
          <div
            key={idx}
            className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300 flex flex-col p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {post.title}
            </h3>
            <div className="text-gray-400 text-sm mb-3 flex justify-between">
              <span>By {post.author}</span>
              <span>{post.date}</span>
            </div>
            <p className="text-gray-600 mb-6 text-sm line-clamp-4">
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
        ))}
      </div>
    </section>
  );
};

export default Blog;
