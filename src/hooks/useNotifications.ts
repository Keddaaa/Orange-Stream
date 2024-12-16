import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Anime } from '../types';

interface Notification {
  id: string;
  type: 'new_episode' | 'continue_watching' | 'recommendation';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  animeId?: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useLocalStorage<Notification[]>('notifications', []);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  };
}