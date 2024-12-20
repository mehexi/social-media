import { MessageCircle, ThumbsUp, UserRound, UserRoundPen } from "lucide-react";
import React from "react";

const NotificationType = ({ type }) => {
  const notiType = type.toLowerCase();

  const renderIcon = () => {
    switch (notiType) {
      case "like":
        return (
          <div className="absolute w-8 h-8 bg-red-600 bottom-0 right-0 rounded-full border-2 border-white flex items-center justify-center">
            <ThumbsUp size={18} fill="white" />
          </div>
        );
      case "retweet":
        return (
          <div className="absolute w-8 h-8 bg-green-600 bottom-0 right-0 rounded-full border-2 border-white flex items-center justify-center">
            <MessageCircle size={18} fill="white" />
          </div>
        );
      case "follow":
        return (
          <div className="absolute w-8 h-8 bg-blue-600 bottom-0 right-0 rounded-full border-2 border-white flex items-center justify-center">
            <UserRound fill="white" size={18} />
          </div>
        );
      default:
        return null;
    }
  };

  return renderIcon();
};

export default NotificationType;
