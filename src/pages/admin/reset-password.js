import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';

const AdminResetPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      toast.error('Access denied. Please login first.');
      router.push('/admin/login');
      return;
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'New password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const isValid = validateForm();
    if (!isValid) {
      setLoading(false);
      return;
    }

    setShowConfirmDialog(true);
    setLoading(false);
  };

  const confirmResetPassword = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, you would call your API here
      // await resetAdminPassword(formData);
      
      toast.success('Password updated successfully!');
      
      // Clear form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setShowConfirmDialog(false);
      
      // Optionally redirect to profile page
      // router.push('/admin/profile');
      
    } catch (error) {
      toast.error('Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cancelResetPassword = () => {
    setShowConfirmDialog(false);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar />
      <SidebarInset>
        <header className="w-full h-[96px] opacity-100 left-[280px] pt-6 pr-[60px] pb-6 pl-[60px] gap-10 border-b border-[#DAD6D1] bg-[#F9F8F6] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
            <h2 className="text-2xl font-bold text-[#26231E]">Reset password</h2>
          </div>
          <button
            onClick={() => document.getElementById('resetForm')?.requestSubmit()}
            disabled={loading}
            className="bg-[#26231E] text-white px-6 py-3 rounded-full hover:bg-[#3A342E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Reset password'}
          </button>
        </header>
        
        <main className="flex-1 px-12 py-8 bg-[#F9F8F6]">
          <div className="max-w-4xl space-y-8">
            <form id="resetForm" onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block font-poppins font-medium text-base leading-6 text-[#75716B]">
                  Current password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className={`w-[480px] h-12 rounded-lg px-4 border focus:outline-none focus:ring-2 focus:ring-[#8B7355] bg-white ${
                    errors.currentPassword ? 'border-red-500' : 'border-[#DAD6D1]'
                  }`}
                  placeholder="Enter current password"
                />
                {errors.currentPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block font-poppins font-medium text-base leading-6 text-[#75716B]">
                  New password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className={`w-[480px] h-12 rounded-lg px-4 border focus:outline-none focus:ring-2 focus:ring-[#8B7355] bg-white ${
                    errors.newPassword ? 'border-red-500' : 'border-[#DAD6D1]'
                  }`}
                  placeholder="Enter new password"
                />
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block font-poppins font-medium text-base leading-6 text-[#75716B]">
                  Confirm new password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-[480px] h-12 rounded-lg px-4 border focus:outline-none focus:ring-2 focus:ring-[#8B7355] bg-white ${
                    errors.confirmPassword ? 'border-red-500' : 'border-[#DAD6D1]'
                  }`}
                  placeholder="Confirm new password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </form>
          </div>

          {/* Confirmation Dialog */}
          {showConfirmDialog && (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-[#F9F8F6] rounded-2xl shadow-xl mx-4 w-[477px] h-[256px] pt-4 pr-6 pb-10 pl-6 gap-6 flex flex-col items-center justify-center">
                {/* Close button */}
                <button
                  onClick={cancelResetPassword}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Dialog content */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-[#26231E] mb-4">Reset password</h3>
                  <p className="text-[#75716B] mb-8">Do you want to reset your password?</p>

                  {/* Action buttons */}
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={cancelResetPassword}
                      className="px-6 py-3 border border-[#26231E] text-[#26231E] hover:bg-gray-50 transition-colors font-medium rounded-[999px]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmResetPassword}
                      disabled={loading}
                      className="px-6 py-3 bg-[#26231E] text-white hover:bg-[#3A342E] transition-colors font-medium rounded-[999px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Resetting...' : 'Reset'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminResetPassword;
