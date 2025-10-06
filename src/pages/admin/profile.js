import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';

const AdminProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    lastLogin: '',
    createdAt: ''
  });

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
      
      // Set form data with user information
      setFormData({
        name: userData.name || 'Admin User',
        email: userData.email || '',
        role: userData.role || 'Administrator',
        lastLogin: userData.lastLogin || new Date().toISOString(),
        createdAt: userData.createdAt || new Date().toISOString()
      });
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

  const handleSaveProfile = () => {
    // Simulate saving profile
    toast.success('Profile updated successfully!');
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
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="ml-auto">
            <h2 className="text-2xl font-bold text-[#26231E]">Profile</h2>
          </div>
        </header>
        
        <main className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-semibold text-[#26231E] mb-6">Admin Profile</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-medium text-[#26231E] text-sm">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-medium text-[#26231E] text-sm">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-medium text-[#26231E] text-sm">Role</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                      placeholder="Your role"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-medium text-[#26231E] text-sm">Last Login</label>
                    <input
                      type="text"
                      value={new Date(formData.lastLogin).toLocaleString()}
                      disabled
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-[#26231E] text-sm">Account Created</label>
                  <input
                    type="text"
                    value={new Date(formData.createdAt).toLocaleString()}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    className="px-6 py-3 bg-[#26231E] text-white rounded-lg hover:bg-[#3A342E] transition-colors"
                  >
                    Save Changes
                  </button>
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
