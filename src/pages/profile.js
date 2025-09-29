import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const Profile = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState('/imgdefault.png');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        email: user.email || ''
      });
      setProfileImage(user.avatar_url || '/imgdefault.png');
    }
  }, [user, loading, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For now, just show a preview (in real app, upload to cloud storage)
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
      toast.success('Profile picture updated!');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would update the user profile in the database
      // For now, just show success message
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F5]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#26231E]"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F5] text-[#26231E]">
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <aside className="w-full lg:w-80 bg-transparent p-6">
              <nav className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#E5E5E5] shadow-sm">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-[#26231E] text-sm">{user?.name || 'User'}</div>
                    <div className="text-[#75716B] text-xs">Profile</div>
                  </div>
                </div>
                
                {/* Navigation Links */}
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-white hover:rounded-xl hover:shadow-sm transition-all">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#26231E]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <span className="text-[#26231E] font-medium">Profile</span>
                  </button>
                  
                  <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-white hover:rounded-xl hover:shadow-sm transition-all">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#75716B]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                      </svg>
                    </div>
                    <span className="text-[#75716B]">Reset password</span>
                  </button>
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-[#F2F2F2] rounded-2xl p-8 shadow-sm">
                {/* Profile Picture Section */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="profile-upload"
                    />
                    <label
                      htmlFor="profile-upload"
                      className="inline-block px-4 py-2 bg-white border border-[#DAD6D1] rounded-lg text-[#26231E] hover:bg-[#F5F3F0] transition-colors cursor-pointer text-sm"
                    >
                      Upload profile picture
                    </label>
                  </div>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSave} className="space-y-6">
                  <div>
                    <label className="block mb-2 font-medium text-[#26231E] text-sm">Name</label>
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
                    <label className="block mb-2 font-medium text-[#26231E] text-sm">Username</label>
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
                      className="w-full h-12 bg-[#F5F5F5] border border-[#DAD6D1] rounded-lg px-4 text-[#75716B] cursor-not-allowed"
                      placeholder="Enter your email"
                      disabled
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-[#333333] text-white rounded-xl hover:bg-[#444444] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;