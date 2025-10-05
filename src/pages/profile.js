import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';
import { uploadProfileImage, updateUserProfile } from '../services/api';
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
      // Set avatar URL with validation
      const avatarUrl = user.avatar_url;
      console.log('Profile - Avatar URL:', avatarUrl);
      
      // Check if avatar URL is valid and accessible
      if (avatarUrl && 
          avatarUrl.startsWith('https://') && 
          avatarUrl.includes('supabase.co') &&
          avatarUrl.includes('/storage/v1/object/public/') &&
          avatarUrl.length > 50) { // Ensure it's not truncated
        console.log('Profile - Using valid avatar URL:', avatarUrl);
        setProfileImage(avatarUrl);
      } else {
        console.log('Profile - Using default image due to invalid URL:', avatarUrl);
        setProfileImage('/imgdefault.png');
      }
    }
  }, [user, loading, router]);

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
      };
      reader.readAsDataURL(file);

      // Upload to Supabase Storage
      if (user?.id) {
        try {
          const imageUrl = await uploadProfileImage(file, user.id);
          
          // Update user profile with new image URL
          const updatedUser = await updateUserProfile(user.id, { avatar_url: imageUrl });
          
          // Update local state
          setProfileImage(imageUrl);
          
          // Force re-render by updating form data
          setFormData(prev => ({
            ...prev,
            // Trigger re-render
            _updated: Date.now()
          }));
          
          toast.success('Profile picture updated successfully!');
        } catch (uploadError) {
          console.error('Upload failed, using local preview:', uploadError);
          
          // Fallback: Keep local preview and show warning
          toast.warning('Image uploaded locally but not saved to server. Please contact administrator to set up storage.');
          
          // Still try to update profile with a placeholder
          try {
            await updateUserProfile(user.id, { 
              avatar_url: `local-preview-${Date.now()}` 
            });
          } catch (updateError) {
            console.error('Failed to update profile:', updateError);
          }
        }
      } else {
        toast.error('User not found. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again.');
      
      // Reset to default image on error
      setProfileImage(user?.avatar_url || '/imgdefault.png');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!user?.id) {
        toast.error('User not found. Please try again.');
        return;
      }

      // Update user profile in database
      const updatedUser = await updateUserProfile(user.id, {
        name: formData.name,
        username: formData.username
      });

      toast.success('Profile updated successfully!');
      
      // Refresh user data (optional - could trigger context update)
      console.log('Profile updated:', updatedUser);
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
      
      <main className="flex-1 flex flex-col p-4 md:p-8 border border-red-500">
        {/* Profile Header - Separated */}
        <div className="w-full max-w-5xl mx-auto mb-6">
          <div className="flex items-center gap-3 p-4 border border-red-500">
            <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/imgdefault.png';
                }}
                key={formData._updated || 'default'} // Force re-render when updated
              />
            </div>
            <span className="font-['Poppins'] font-semibold text-2xl leading-8 text-[#8B7355]">{user?.name || 'User'}</span>
            <div className="w-px h-4 bg-gray-300"></div>
            <span className="font-['Poppins'] font-semibold text-2xl leading-8 text-[#26231E]">Profile</span>
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 border border-red-500">
            {/* Left Sidebar */}
            <aside className="w-full lg:w-80 bg-transparent p-6">
              <nav className="space-y-6">
                
                {/* Navigation Links */}
                <div className="space-y-2 border border-red-500 pb-4">
                  <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-white hover:rounded-xl hover:shadow-sm transition-all">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#43403B]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <span className="font-['Poppins'] font-medium text-base leading-6 text-[#43403B]">Profile</span>
                  </button>
                  
                  <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-white hover:rounded-xl hover:shadow-sm transition-all">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#75716B]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                      </svg>
                    </div>
                    <span className="font-['Poppins'] font-medium text-base leading-6 text-[#75716B]">Reset password</span>
                  </button>
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <div className="w-[550px] h-[652px] bg-[#EFEEEB] rounded-2xl p-[40px] shadow-sm">
                {/* Profile Picture Section */}
                <div className="mb-8 flex items-center gap-6">
                  <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.src = '/imgdefault.png')}
                      key={formData._updated || 'default'}
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
                      className="inline-flex items-center justify-center gap-[6px] w-[255px] h-[48px] px-[40px] py-[12px] bg-white border border-[#75716B] rounded-full text-[#26231E] hover:bg-[#F5F3F0] transition-colors cursor-pointer font-['Poppins'] font-medium text-base leading-6 text-center"
                    >
                      Upload profile picture
                    </label>
                  </div>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSave} className="space-y-6">
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
                      className="w-full h-12 bg-[#F5F5F5] border border-[#DAD6D1] rounded-lg px-4 text-[#75716B] cursor-not-allowed"
                      placeholder="Enter your email"
                      disabled
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-start">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-[141px] h-[48px] rounded-[999px] bg-[#26231E] px-[40px] py-[12px] font-poppins font-medium text-base leading-6 text-white hover:bg-[#3A342E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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