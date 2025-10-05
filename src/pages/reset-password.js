import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const ResetPassword = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (user) {
      // Set profile image if available
      const avatarUrl = user.avatar_url;
      console.log('Reset Password - Avatar URL:', avatarUrl);
    }
  }, [user, loading]);

  const validateField = (name, value) => {
    const errors = { ...validationErrors };
    
    switch (name) {
      case 'currentPassword':
        if (!value.trim()) {
          errors.currentPassword = 'Current password is required';
        } else if (value.length < 6) {
          errors.currentPassword = 'Current password must be at least 6 characters long';
        } else {
          delete errors.currentPassword;
        }
        break;
        
      case 'newPassword':
        if (!value.trim()) {
          errors.newPassword = 'New password is required';
        } else if (value.length < 6) {
          errors.newPassword = 'New password must be at least 6 characters long';
        } else if (value.length > 128) {
          errors.newPassword = 'New password must be less than 128 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          errors.newPassword = 'New password must contain at least one uppercase letter, one lowercase letter, and one number';
        } else {
          delete errors.newPassword;
        }
        break;
        
      case 'confirmPassword':
        if (!value.trim()) {
          errors.confirmPassword = 'Please confirm your new password';
        } else if (formData.newPassword !== value) {
          errors.confirmPassword = 'New passwords do not match';
        } else {
          delete errors.confirmPassword;
        }
        break;
    }
    
    // Check if passwords are the same
    if (name === 'newPassword' && formData.currentPassword === value && value) {
      errors.newPassword = 'New password must be different from current password';
    } else if (name === 'currentPassword' && formData.newPassword === value && value) {
      errors.newPassword = 'New password must be different from current password';
    }
    
    setValidationErrors(errors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Real-time validation
    validateField(name, value);
  };

  const validateForm = () => {
    const errors = [];

    // Current password validation
    if (!formData.currentPassword.trim()) {
      errors.push('Current password is required');
    } else if (formData.currentPassword.length < 6) {
      errors.push('Current password must be at least 6 characters long');
    }

    // New password validation
    if (!formData.newPassword.trim()) {
      errors.push('New password is required');
    } else if (formData.newPassword.length < 6) {
      errors.push('New password must be at least 6 characters long');
    } else if (formData.newPassword.length > 128) {
      errors.push('New password must be less than 128 characters');
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      errors.push('New password must contain at least one uppercase letter, one lowercase letter, and one number');
    }

    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      errors.push('Please confirm your new password');
    } else if (formData.newPassword !== formData.confirmPassword) {
      errors.push('New passwords do not match');
    }

    // Check if passwords are the same
    if (formData.currentPassword === formData.newPassword) {
      errors.push('New password must be different from current password');
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      validationErrors.forEach(error => {
        toast.error(error);
      });
      setIsSubmitting(false);
      return;
    }

    // Show loading message
    toast.loading('Verifying current password...');

    // Simulate API call
    setTimeout(() => {
      toast.dismiss(); // Remove loading toast
      toast.success('Password updated successfully!');
      
      // Reset form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F5]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#26231E]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F5]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#26231E] mx-auto mb-4"></div>
          <p className="text-[#75716B]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F5] text-[#26231E]">
      <Navigation />
      
      <main className="flex-1 flex flex-col p-4 md:p-8">
        {/* Profile Header - Separated */}
        <div className="w-full max-w-5xl mx-auto mb-6">
          <div className="flex items-center gap-3 p-4">
            <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
              <img 
                src={user?.avatar_url || '/imgdefault.png'} 
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/imgdefault.png';
                }}
              />
            </div>
            <span className="font-['Poppins'] font-semibold text-2xl leading-8 text-[#8B7355]">{user?.name || 'User'}</span>
            <div className="w-px h-4 bg-gray-300"></div>
            <span className="font-['Poppins'] font-semibold text-2xl leading-8 text-[#26231E]">Reset password</span>
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <aside className="w-full lg:w-80 bg-transparent p-6">
              <nav className="space-y-6">
                
                {/* Navigation Links */}
                <div className="space-y-2 pb-4">
                  <button 
                    onClick={() => router.push('/profile')}
                    className="w-full flex items-center gap-4 p-4 text-left hover:bg-white hover:rounded-xl hover:shadow-sm transition-all"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#75716B]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <span className="font-['Poppins'] font-medium text-base leading-6 text-[#75716B]">Profile</span>
                  </button>
                  
                  <button className="w-full flex items-center gap-4 p-4 text-left bg-white rounded-xl shadow-sm">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#43403B]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                      </svg>
                    </div>
                    <span className="font-['Poppins'] font-medium text-base leading-6 text-[#43403B]">Reset password</span>
                  </button>
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <div className="w-[550px] bg-[#EFEEEB] rounded-2xl p-[40px] shadow-sm">
                {/* Reset Password Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Hidden email field for accessibility */}
                  <input
                    type="email"
                    value={user?.email || ''}
                    autoComplete="username"
                    style={{ display: 'none' }}
                    aria-hidden="true"
                    tabIndex="-1"
                  />
                  
                  <div>
                    <label className="block mb-2 font-medium text-[#75716B] text-sm">Current password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className={`w-full h-12 bg-white border rounded-lg px-4 text-[#26231E] focus:outline-none focus:ring-2 focus:border-transparent ${
                        validationErrors.currentPassword 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-[#DAD6D1] focus:ring-[#26231E]'
                      }`}
                      placeholder="Current password"
                      autoComplete="current-password"
                    />
                    {validationErrors.currentPassword && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.currentPassword}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-[#75716B] text-sm">New password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className={`w-full h-12 bg-white border rounded-lg px-4 text-[#26231E] focus:outline-none focus:ring-2 focus:border-transparent ${
                        validationErrors.newPassword 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-[#DAD6D1] focus:ring-[#26231E]'
                      }`}
                      placeholder="New password"
                      autoComplete="new-password"
                    />
                    {validationErrors.newPassword && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.newPassword}</p>
                    )}
                    {formData.newPassword && !validationErrors.newPassword && (
                      <div className="mt-2">
                        <div className="text-xs text-[#75716B] mb-1">Password strength:</div>
                        <div className="flex gap-1">
                          <div className={`h-1 flex-1 rounded ${
                            formData.newPassword.length >= 6 ? 'bg-green-400' : 'bg-gray-200'
                          }`}></div>
                          <div className={`h-1 flex-1 rounded ${
                            /(?=.*[a-z])/.test(formData.newPassword) ? 'bg-green-400' : 'bg-gray-200'
                          }`}></div>
                          <div className={`h-1 flex-1 rounded ${
                            /(?=.*[A-Z])/.test(formData.newPassword) ? 'bg-green-400' : 'bg-gray-200'
                          }`}></div>
                          <div className={`h-1 flex-1 rounded ${
                            /(?=.*\d)/.test(formData.newPassword) ? 'bg-green-400' : 'bg-gray-200'
                          }`}></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-[#75716B] text-sm">Confirm new password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full h-12 bg-white border rounded-lg px-4 text-[#26231E] focus:outline-none focus:ring-2 focus:border-transparent ${
                        validationErrors.confirmPassword 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-[#DAD6D1] focus:ring-[#26231E]'
                      }`}
                      placeholder="Confirm new password"
                      autoComplete="new-password"
                    />
                    {validationErrors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
                    )}
                  </div>

                  <div className="pt-6 flex items-center justify-start">
                    <button
                      type="submit"
                      disabled={isSubmitting || Object.keys(validationErrors).length > 0 || !formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
                      className="rounded-[999px] bg-[#26231E] px-[40px] py-[12px] font-poppins font-medium text-base leading-6 text-white hover:bg-[#3A342E]"
                      style={{
                        width: '208px',
                        height: '48px'
                      }}
                    >
                      {isSubmitting ? 'Resetting...' : 'Reset password'}
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

export default ResetPassword;
