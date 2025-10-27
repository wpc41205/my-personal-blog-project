import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getNotifications, markNotificationAsRead } from '../../services/api';
import { supabase } from '../../lib/supabase';

const NotificationDropdown = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
      loadAdminUser();
    }
  }, [isOpen]);

  const loadAdminUser = async () => {
    try {
      const { data } = await supabase
        .from('admin_users')
        .select('name, avatar_url')
        .eq('role', 'super_admin')
        .single();
      setAdminUser(data);
    } catch (error) {
      console.error('Error loading admin user:', error);
    }
  };

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await getNotifications(10); // Load last 10 notifications
      setNotifications(data);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = async (notification) => {
    try {
      if (!notification.is_read) {
        await markNotificationAsRead(notification.id);
        setNotifications(prev => 
          prev.map(n => 
            n.id === notification.id 
              ? { ...n, is_read: true }
              : n
          )
        );
      }
      
      // Navigate to the post
      if (notification.post_id) {
        router.push(`/post/${notification.post_id}`);
        onClose(); // Close dropdown after navigation
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const formatTimeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);
    if (diff < 3600) return `${Math.max(1, Math.floor(diff / 60))} mins ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto"></div>
            <p className="text-sm text-gray-500 mt-2">Loading...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          notifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                !notification.is_read ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                      src={adminUser?.avatar_url || '/me.jpg'}
                      alt="Admin Avatar"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold">{adminUser?.name || 'Admin'}</span> {notification.message}
                  </p>
                  <p className="text-xs text-orange-500 mt-1">
                    {formatTimeAgo(notification.created_at)}
                  </p>
                </div>
                {!notification.is_read && (
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
    </div>
  );
};

export default NotificationDropdown;
