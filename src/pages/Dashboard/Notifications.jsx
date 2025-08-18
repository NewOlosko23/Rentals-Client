import React, { useEffect, useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Replace with API or localStorage fetch
    const sampleNotifications = [
      {
        id: 1,
        title: "Listing Approved 🎉",
        message: "Your property listing has been approved successfully.",
        time: "2 minutes ago",
        type: "success",
      },
      {
        id: 2,
        title: "New Message 💬",
        message: "You received a message from John about your property.",
        time: "15 minutes ago",
        type: "message",
      },
      {
        id: 3,
        title: "Reminder ⏰",
        message: "Complete your profile to get more visibility.",
        time: "1 hour ago",
        type: "reminder",
      },
      {
        id: 4,
        title: "System Update ⚙️",
        message: "We will be performing maintenance tonight at 12:00 AM.",
        time: "Yesterday",
        type: "system",
      },
    ];
    setNotifications(sampleNotifications);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 mt-14">
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Notifications
        </h1>

        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md transition border border-gray-100"
              >
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full text-xl ${
                    notification.type === "success"
                      ? "bg-green-100 text-green-600"
                      : notification.type === "message"
                      ? "bg-blue-100 text-blue-600"
                      : notification.type === "reminder"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {notification.type === "success" && "✔️"}
                  {notification.type === "message" && "💬"}
                  {notification.type === "reminder" && "⏰"}
                  {notification.type === "system" && "⚙️"}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-gray-800 font-semibold text-lg">
                    {notification.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-400 mt-2 block">
                    {notification.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">
            No notifications yet 📭
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
