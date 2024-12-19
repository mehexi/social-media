"use client";
import { useNotifications } from "@/hooks/useNotification";
import React, { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import { Separator } from "@/components/ui/separator";

const NotificationBody = ({ notifications, currentUser }) => {
  const liveNotifications = useNotifications(currentUser.id);

  console.log(liveNotifications)

  return (
    <div className="flex flex-col gap-2 mt-3">
      {liveNotifications.length > 0 && (
        <div className="flex flex-col gap-3">
          <h1>New Notifications</h1>
          {liveNotifications.map((notification) => (
            <NotificationItem
              key={notifications.id}
              notification={notification}
            />
          ))}
          <Separator />
        </div>
      )}
      <h1>Earlier</h1>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationBody;
