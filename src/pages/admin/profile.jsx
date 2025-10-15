import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { toast } from 'sonner';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { getAdminUserByEmail, updateAdminUserByEmail } from '../../services/api';

const AdminProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    bio: ''
  });
  const [profileImage, setProfileImage] = useState('/me.jpg');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    const adminUserData = localStorage.getItem('adminUser');
    
    if (!adminToken || !adminUserData) {
      toast.error('Access denied. Please login first.');
      router.push('/admin/login');
      return;
    }

    try {
      const userData = JSON.parse(adminUserData);
      setAdminUser(userData);

      // Prefer loading from Supabase admin_users if available
      (async () => {
        try {
          const row = await getAdminUserByEmail(userData.email);
          if (row) {
            setFormData({
              name: row.name || '',
              username: row.username || '',
              email: row.email || userData.email,
              bio: row.bio || ''
            });
            if (row.avatar_url) setProfileImage(row.avatar_url);
          } else {
            // Fallback to whatever is in localStorage
            setFormData({
              name: userData.name || '',
              username: userData.username || '',
              email: userData.email || '',
              bio: userData.bio || ''
            });
            if (userData.avatar_url) setProfileImage(userData.avatar_url);
          }
        } catch (err) {
          // On error, still show local data
          setFormData({
            name: userData.name || '',
            username: userData.username || '',
            email: userData.email || '',
            bio: userData.bio || ''
          });
          if (userData.avatar_url) setProfileImage(userData.avatar_url);
        }
      })();
    } catch (error) {
      console.error('Error parsing admin user data:', error);
      router.push('/admin/login');
    }

    setLoading(false);
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    try {
      // Show preview first
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        // persist preview as avatar_url in adminUser for this demo
        try {
          const adminUserData = localStorage.getItem('adminUser');
          if (adminUserData) {
            const parsed = JSON.parse(adminUserData);
            const updated = { ...parsed, avatar_url: e.target.result };
            localStorage.setItem('adminUser', JSON.stringify(updated));
          }
        } catch {}
      };
      reader.readAsDataURL(file);
      
      toast.success('Profile picture updated successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again.');
    }
  };

  const handleSaveProfile = async (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    setIsSubmitting(true);

    try {
      // Update in Supabase admin_users using email as key
      await updateAdminUserByEmail(formData.email, {
        name: formData.name,
        username: formData.username,
        bio: formData.bio,
        avatar_url: profileImage
      });

      // Mirror to localStorage for quick UI load next time
      const adminUserData = localStorage.getItem('adminUser');
      const existing = adminUserData ? JSON.parse(adminUserData) : {};
      const payload = { ...existing, ...formData, avatar_url: profileImage };
      localStorage.setItem('adminUser', JSON.stringify(payload));
      setAdminUser(payload);

      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    toast.success('Logged out successfully');
    router.push('/admin/login');
  };

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
        <header className="w-full h-[96px] opacity-100 left-[280px] pt-6 pr-[60px] pb-6 pl-[60px] gap-10 border-b border-[#DAD6D1] bg-[#F9F8F6] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
            <h2 className="text-2xl font-bold text-[#26231E]">Profile</h2>
          </div>
          <button
            type="button"
            onClick={handleSaveProfile}
            disabled={isSubmitting}
            className="w-[120px] h-[48px] bg-[#26231E] text-white pt-3 pr-10 pb-3 pl-10 gap-[6px] rounded-[999px] flex items-center justify-center hover:bg-[#3A342E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-[#75716B]"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </header>
        
        <main className="flex-1 p-8">
          <div className="w-full">
            <div className="rounded-2xl p-10">
              <form onSubmit={handleSaveProfile} className="space-y-6">
                {/* Profile Picture Section */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
                    <Image
                      src={profileImage}
                      alt="Profile"
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="profile-upload"
                    />
                    <label
                      htmlFor="profile-upload"
                      className="inline-flex items-center justify-center gap-2 w-[255px] h-[48px] px-10 py-3 bg-white border border-[#75716B] rounded-full text-[#26231E] hover:bg-[#F5F3F0] transition-colors cursor-pointer font-medium text-base text-center"
                    >
                      Upload profile picture
                    </label>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 font-medium text-[#75716B] text-sm">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full h-12 bg-white border border-[#DAD6D1] rounded-lg px-4 text-[#26231E] focus:outline-none focus:ring-2 focus:ring-[#26231E] focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-[#75716B] text-sm">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full h-12 bg-white border border-[#DAD6D1] rounded-lg px-4 text-[#26231E] focus:outline-none focus:ring-2 focus:ring-[#26231E] focus:border-transparent"
                      placeholder="Enter your username"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-[#75716B] text-sm">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full h-12 bg-white border border-[#DAD6D1] rounded-lg px-4 text-[#26231E] focus:outline-none focus:ring-2 focus:ring-[#26231E] focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-[#75716B] text-sm">Bio (max 120 letters)</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      maxLength={120}
                      className="w-full bg-white border border-[#DAD6D1] rounded-lg px-4 py-3 text-[#26231E] focus:outline-none focus:ring-2 focus:ring-[#26231E] focus:border-transparent resize-none"
                      placeholder="Tell us about yourself..."
                    />
                    <div className="text-right text-xs text-[#75716B] mt-1">
                      {formData.bio.length}/120
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminProfile;
