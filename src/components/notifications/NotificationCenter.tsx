import React from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';
import { formatDate } from '../../utils/formatters';

export function NotificationCenter() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  } = useNotifications();

  if (notifications.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400">
        Aucune notification
      </div>
    );
  }

  return (
    <div className="w-80 max-h-[70vh] overflow-y-auto bg-gray-800 rounded-lg shadow-xl">
      <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Notifications</h3>
          <div className="flex space-x-2">
            <button
              onClick={markAllAsRead}
              className="p-1 hover:text-red-500 transition"
              title="Tout marquer comme lu"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              onClick={clearNotifications}
              className="p-1 hover:text-red-500 transition"
              title="Effacer toutes les notifications"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        {unreadCount > 0 && (
          <p className="text-sm text-gray-400">
            {unreadCount} nouvelle{unreadCount > 1 ? 's' : ''} notification{unreadCount > 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="divide-y divide-gray-700">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 hover:bg-gray-700 transition cursor-pointer ${
              !notification.read ? 'bg-gray-700/50' : ''
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="flex items-start space-x-3">
              <Bell className={`h-5 w-5 ${!notification.read ? 'text-red-500' : 'text-gray-400'}`} />
              <div className="flex-1">
                <p className="font-medium">{notification.title}</p>
                <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {formatDate(notification.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}