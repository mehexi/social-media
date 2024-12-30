"use client";
import { useNotifications } from "@/hooks/useNotification";
import React, { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import { Separator } from "@/components/ui/separator";

const NotificationBody = ({ notifications: initialNotifications }) => {
  const { notifications: liveNotifications, clearNotifications } = useNotifications();
  const [earlierNotifications, setEarlierNotifications] = useState(initialNotifications);

  useEffect(() => {
    if (liveNotifications.length > 0) {
      const timer = setTimeout(() => {
        setEarlierNotifications((prev) => [...liveNotifications, ...prev]);
        clearNotifications();
      }, 5000); 
  
      return () => clearTimeout(timer); 
    }
  }, [liveNotifications, clearNotifications]);
  

  if (earlierNotifications.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h1 className="text-3xl font-bold">No notifications</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 mt-3 mb-12">
      {liveNotifications.length > 0 && (
        <div className="flex flex-col gap-3">
          <h1>New Notifications</h1>
          {liveNotifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
          <Separator />
        </div>
      )}
      <h1>Earlier</h1>
      {earlierNotifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationBody;
