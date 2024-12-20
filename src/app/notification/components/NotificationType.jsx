import { MessageCircle, ThumbsUp, UserRound, UserRoundPen } from "lucide-react";
import React from "react";

const NotificationType = ({ type }) => {
  const notiType = type.toLowerCase();

  const renderIcon = () => {
    switch (notiType) {
      case "like":
        return (
          <div className="absolute w-6 h-6 bg-red-600 -bottom-2 -right-2 rounded-full border-2 border-white flex items-center justify-center">
            <ThumbsUp size={12} fill="white" />
          </div>
        );
      case "retweet":
        return (
          <div className="absolute w-6 h-6 bg-green-600 -bottom-2 -right-2 rounded-full border-2 border-white flex items-center justify-center">
            <MessageCircle size={12} fill="white" />
          </div>
        );
      case "follow":
        return (
          <div className="absolute w-6 h-6 bg-blue-600 -bottom-2 -right-2 rounded-full border-2 border-white flex items-center justify-center">
            <UserRound fill="white" size={12} />
          </div>
        );
      default:
        return null;
    }
  };

  return renderIcon();
};

export default NotificationType;
