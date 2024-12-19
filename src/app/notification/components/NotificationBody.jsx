"use client";
import { useNotifications } from "@/hooks/useNotification";
import React from "react";

const NotificationBody = ({ notifications, currentUser }) => {
  const liveNotifications = useNotifications(currentUser.id);

  console.log(liveNotifications);

  if (notifications.length === 0) {
    return <h1>no notifications</h1>;
  }

  return <>NotificationBody</>;
};

export default NotificationBody;
