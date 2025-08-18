import { Link } from "react-router-dom";
import blogPosts from "../../data/blogs";

const Blog = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Guides & Tips</h2>
        <p className="text-gray-600">
          Everything you need to know to list, rent, lease, or buy properties
          using our platform.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {blogPosts.map((post, idx) => (
          <div
            key={idx}
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
        ))}
      </div>
    </section>
  );
};

export default Blog;
