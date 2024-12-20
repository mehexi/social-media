import OtherUserAvatars from "@/components/ui/otherUserAvatars";
import NotificationType from "./NotificationType";
import React from "react";

const NotificationItem = ({ notification }) => {
  const createdAtDate = new Date(notification.createdAt);
  const currentDate = new Date();

  const isToday = createdAtDate.toDateString() === currentDate.toDateString();

  const formattedTimeOrDate = isToday
    ? createdAtDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }) 
    : createdAtDate.toLocaleDateString([], { day: "numeric", month: "short" });

  return (
    <div className="flex items-center gap-3 bg-secondary rounded px-3 py-3">
      <div className="border relative pointer-events-none">
        <OtherUserAvatars
          id={notification.actor.clerkUserId}
          width={8}
          height={8}
        />
        <NotificationType type={notification.type} />
      </div>
      <h1 className="capitalize italic">{notification.content}</h1>
      <span className="text-sm text-gray-500 ml-auto">{formattedTimeOrDate}</span>
    </div>
  );
};

export default NotificationItem;
