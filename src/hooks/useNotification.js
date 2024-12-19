import { useEffect, useState } from 'react';
import { pusherClient } from '@/lib/pusher';

export function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const channel = pusherClient.subscribe(userId);

    const handleNewNotification = (notification) => {
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    };

    channel.bind('notification:new', handleNewNotification);

    return () => {
      channel.unbind('notification:new', handleNewNotification);
      pusherClient.unsubscribe(userId);
    };
  }, [userId]);

  return notifications;
}
