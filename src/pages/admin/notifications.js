import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';

const AdminNotifications = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Dummy data for demonstration
  const getDummyNotifications = () => [
    {
      id: 1,
      type: 'new_article',
      title: 'New Article Published',
      message: 'A new article "Understanding Cat Behavior" has been published.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'user_registration',
      title: 'New User Registration',
      message: 'john.doe@example.com has registered for an account.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'system',
      title: 'System Update Available',
      message: 'A new system update is available for installation.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'comment',
      title: 'New Comment on Article',
      message: 'Someone commented on "The Science of Cat Purring".',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
      priority: 'medium'
    },
    {
      id: 5,
      type: 'backup',
      title: 'Backup Completed',
      message: 'Daily backup has been completed successfully.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      read: true,
      priority: 'low'
    }
  ];

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      toast.error('Access denied. Please login first.');
      router.push('/admin/login');
      return;
    }

    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setNotifications(getDummyNotifications());
      setLoading(false);
    }, 500);
  }, [router]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleMarkAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
    toast.success('Notification marked as read');
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast.success('All notifications marked as read');
  };

  const handleDeleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast.success('Notification deleted');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'new_article': return '📄';
      case 'user_registration': return '👤';
      case 'system': return '⚙️';
      case 'comment': return '💬';
      case 'backup': return '💾';
      default: return '🔔';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F8F5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#26231E]"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="ml-auto flex items-center gap-4">
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount} unread
              </span>
            )}
            <h2 className="text-2xl font-bold text-[#26231E]">Notifications</h2>
          </div>
        </header>
        
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <select
                value={filter}
                onChange={handleFilterChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
                <option value="new_article">New Articles</option>
                <option value="user_registration">User Registration</option>
                <option value="system">System</option>
                <option value="comment">Comments</option>
                <option value="backup">Backup</option>
              </select>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Mark All as Read
              </button>
            )}
          </div>

          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="text-gray-400 text-6xl mb-4">🔔</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                <p className="text-gray-500">You're all caught up!</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white rounded-lg shadow p-6 border-l-4 ${
                    notification.read 
                      ? 'border-gray-200' 
                      : notification.priority === 'high' 
                        ? 'border-red-500' 
                        : 'border-blue-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">{getTypeIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className={`font-medium ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                            {notification.title}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(notification.priority)}`}>
                            {notification.priority}
                          </span>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{notification.message}</p>
                        <p className="text-sm text-gray-400">
                          {notification.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteNotification(notification.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminNotifications;
