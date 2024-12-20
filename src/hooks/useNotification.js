import { useEffect, useState } from 'react';
import axios from 'axios';
import { pusherClient } from '@/lib/pusher';

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/getCurrentUser');
        setUserId(response.data.id);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

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

  const clearNotifications = () => {
    setNotifications([]);
  };

  return { notifications, clearNotifications };
}
