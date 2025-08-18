import React from "react";

const Profile = () => {
  // Fetch user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <p>No profile information available. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 mt-14">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Top Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

        {/* Profile Header */}
        <div className="relative flex flex-col items-center -mt-16 pb-6 border-b border-gray-100">
          <img
            src={user.avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-32 h-32 rounded-full shadow-lg object-cover border-4 border-white"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {user.name || "User Name"}
          </h2>
          <p className="text-gray-500">{user.email || "user@email.com"}</p>
        </div>

        {/* Details Section */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
            <h3 className="text-gray-700 font-semibold">📞 Phone</h3>
            <p className="text-gray-600 mt-1">{user.phone || "N/A"}</p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
            <h3 className="text-gray-700 font-semibold">📍 Location</h3>
            <p className="text-gray-600 mt-1">
              {user.location || "Not provided"}
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
            <h3 className="text-gray-700 font-semibold">📅 Joined</h3>
            <p className="text-gray-600 mt-1">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Unknown"}
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
            <h3 className="text-gray-700 font-semibold">ℹ️ About</h3>
            <p className="text-gray-600 mt-1">
              {user.about || "No description available."}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-8 pb-8 flex justify-center gap-4">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
            Edit Profile
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl shadow hover:bg-gray-300 transition">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
