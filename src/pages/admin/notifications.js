import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { supabase } from '@/lib/supabase';

const AdminNotifications = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState('/me.jpg');

  // Minimal dummy data matching the provided UI
  const getDemoData = (avatar) => [
    {
      id: 1,
      avatar: avatar,
      name: 'Jacob Lash',
      text: 'Commented on your article: The Fascinating World of Cats: Why We Love Our Furry Friends',
      detail: '“I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.”',
      timeAgo: '4 hours ago',
      href: '#'
    },
    {
      id: 2,
      avatar: avatar,
      name: 'Jacob Lash',
      text: 'liked your article: The Fascinating World of Cats: Why We Love Our Furry Friends',
      detail: '',
      timeAgo: '4 hours ago',
      href: '#'
    }
  ];

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      toast.error('Access denied. Please login first.');
      router.push('/admin/login');
      return;
    }

    // pull avatar from localStorage if available
    try {
      const adminUserData = localStorage.getItem('adminUser');
      if (adminUserData) {
        const parsed = JSON.parse(adminUserData);
        if (parsed?.avatar_url) {
          setAvatarUrl(parsed.avatar_url);
        }
      }
    } catch {}

    const formatTimeAgo = (date) => {
      const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
      const hours = Math.floor(diff / 3600);
      const days = Math.floor(diff / 86400);
      if (diff < 3600) return `${Math.max(1, Math.floor(diff / 60))} mins ago`;
      if (hours < 24) return `${hours} hours ago`;
      return `${days} days ago`;
    };

    const load = async () => {
      try {
        setLoading(true);

        // Fetch recent comments
        const { data: comments, error: commentsError } = await supabase
          .from('comments')
          .select('id, post_id, user_id, content, created_at')
          .order('created_at', { ascending: false })
          .limit(10);

        if (commentsError) throw commentsError;

        const commentUserIds = [...new Set((comments || []).map(c => c.user_id))];
        const commentPostIds = [...new Set((comments || []).map(c => c.post_id))];

        const [{ data: users }, { data: posts }] = await Promise.all([
          supabase.from('users').select('id, name, avatar_url').in('id', commentUserIds),
          supabase.from('posts').select('id, title').in('id', commentPostIds)
        ]);

        const userMap = new Map((users || []).map(u => [u.id, u]));
        const postMap = new Map((posts || []).map(p => [p.id, p]));

        const commentNotifications = (comments || []).map(c => {
          const u = userMap.get(c.user_id) || {};
          const p = postMap.get(c.post_id) || {};
          return {
            id: `comment_${c.id}`,
            avatar: u.avatar_url || avatarUrl,
            name: u.name || 'Someone',
            text: `Commented on your article: ${p.title || 'Untitled'}`,
            detail: c.content || '',
            timeAgo: formatTimeAgo(c.created_at),
            href: `/admin/article-management`
          };
        });

        // Fetch recent likes
        const { data: likes, error: likesError } = await supabase
          .from('post_likes')
          .select('id, post_id, user_id, created_at')
          .order('created_at', { ascending: false })
          .limit(10);

        if (likesError) throw likesError;

        const likeUserIds = [...new Set((likes || []).map(l => l.user_id))];
        const likePostIds = [...new Set((likes || []).map(l => l.post_id))];

        const [{ data: likeUsers }, { data: likePosts }] = await Promise.all([
          supabase.from('users').select('id, name, avatar_url').in('id', likeUserIds),
          supabase.from('posts').select('id, title').in('id', likePostIds)
        ]);

        const likeUserMap = new Map((likeUsers || []).map(u => [u.id, u]));
        const likePostMap = new Map((likePosts || []).map(p => [p.id, p]));

        const likeNotifications = (likes || []).map(l => {
          const u = likeUserMap.get(l.user_id) || {};
          const p = likePostMap.get(l.post_id) || {};
          return {
            id: `like_${l.id}`,
            avatar: u.avatar_url || avatarUrl,
            name: u.name || 'Someone',
            text: `liked your article: ${p.title || 'Untitled'}`,
            detail: '',
            timeAgo: formatTimeAgo(l.created_at),
            href: `/admin/article-management`
          };
        });

        const combined = [...commentNotifications, ...likeNotifications]
          .sort((a, b) => (a.timeAgo > b.timeAgo ? -1 : 1));

        if (combined.length === 0) {
          setNotifications(getDemoData(avatarUrl));
        } else {
          setNotifications(combined);
        }
      } catch (err) {
        console.warn('Falling back to demo notifications:', err);
        setNotifications(getDemoData(avatarUrl));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router, avatarUrl]);

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
        <header className="w-full h-[96px] opacity-100 left-[280px] pt-6 pr-[60px] pb-6 pl-[60px] gap-10 border-b border-[#DAD6D1] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
            <h2 className="text-2xl font-bold text-[#26231E]">Notification</h2>
          </div>
        </header>

        <main className="flex-1 px-12 py-8">
          <div className="rounded-lg">
            {notifications.map((n, idx) => (
              <div key={n.id} className={`px-6 py-5 ${idx !== 0 ? 'border-t border-[#EFEDE9]' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <img src={n.avatar} alt={n.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-[#26231E] font-medium text-sm">
                        <span className="text-[#26231E] font-semibold">{n.name}</span> {n.text}
                      </p>
                      {n.detail && (
                        <p className="text-[#75716B] text-sm mt-2 max-w-4xl">{n.detail}</p>
                      )}
                      <p className="text-xs text-[#75716B] mt-2">{n.timeAgo}</p>
                    </div>
                  </div>
                  <a href={n.href} className="text-[#26231E] text-sm hover:text-[#8B7355]">View</a>
                </div>
              </div>
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminNotifications;
