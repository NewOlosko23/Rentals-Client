import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 bg-gray-50">
        <p className="text-lg">
          No profile information available. Please log in.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 mt-16">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
        {/* Top Banner */}
        <div className="h-36 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        {/* Profile Header */}
        <div className="relative flex flex-col items-center -mt-20 pb-8 border-b border-gray-200">
          <img
            src={user.avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-36 h-36 rounded-full shadow-xl object-cover border-4 border-white"
          />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            {user.username || "User Name"}
          </h2>
          <p className="text-gray-500 mt-1">{user.email || "user@email.com"}</p>
        </div>

        {/* Details Section */}
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <h3 className="text-gray-700 font-semibold">📞 Phone</h3>
            <p className="text-gray-600 mt-2">{user.phone || "N/A"}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <h3 className="text-gray-700 font-semibold">📍 Location</h3>
            <p className="text-gray-600 mt-2">
              {user.location || "Not provided"}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <h3 className="text-gray-700 font-semibold">📅 Joined</h3>
            <p className="text-gray-600 mt-2">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Unknown"}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <h3 className="text-gray-700 font-semibold">ℹ️ About</h3>
            <p className="text-gray-600 mt-2">
              {user.about || "No description available."}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-10 pb-10 flex justify-center gap-6 mt-4">
          <button className="px-8 py-3 bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 transition">
            Edit Profile
          </button>
          <button className="px-8 py-3 bg-gray-100 text-gray-700 rounded-2xl shadow hover:bg-gray-200 transition">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
