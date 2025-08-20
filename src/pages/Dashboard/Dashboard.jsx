import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 mb-4">
          Dashboard
        </h2>
        {user ? (
          <div className="space-y-3 text-sm tracking-tight">
            <p>
              <span className="font-medium text-gray-700">Name:</span>{" "}
              {user.username}
            </p>
            <p>
              <span className="font-medium text-gray-700">Email:</span>{" "}
              {user.email}
            </p>
            <p>
              <span className="font-medium text-gray-700">Phone:</span>{" "}
              {user.phone}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">No user found. Please log in.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
