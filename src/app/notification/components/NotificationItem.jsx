import OtherUserAvatars from "@/components/ui/otherUserAvatars";
import { ThumbsUp } from "lucide-react";
import React from "react";
import NotificationType from "./NotificationType";

const NotificationItem = ({ notification }) => {

  return (
    <div className="h-20 flex items-center gap-3 bg-secondary px-6 py-3 rounded-xl">
      <div className="border relative pointer-events-none">
        <OtherUserAvatars id={notification.actor.clerkUserId} width={14} height={14} />
        <NotificationType type={notification.type}/>
      </div>
      <h1 className="capitalize italic">{notification.content}</h1>
    </div>
  );
};

export default NotificationItem;
