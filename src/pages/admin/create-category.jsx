import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { createCategory } from '../../services/api';

const CreateCategory = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState('');

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
    setCategoryName(e.target.value);
  };

  const handleCancel = () => {
    router.push('/admin/category-management');
  };

  const handleSave = async () => {
    if (!categoryName.trim()) {
      toast.error('Please enter a category name');
      return;
    }

    try {
      setLoading(true);
      
      await createCategory({ name: categoryName });
      
      toast.success('Category created successfully!');
      router.push('/admin/category-management');
      
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Failed to create category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar />
      <SidebarInset>
        <header className="w-full h-[96px] opacity-100 left-[280px] pt-6 pr-[60px] pb-6 pl-[60px] gap-10 border-b border-[#DAD6D1] bg-[#F9F8F6] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
            <h2 className="text-2xl font-bold text-[#26231E]">Create category</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              disabled={loading}
              className="bg-white text-[#26231E] px-6 py-3 rounded-full border border-[#DAD6D1] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-[#26231E] text-white px-6 py-3 rounded-full hover:bg-[#3A342E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </header>
        
        <main className="flex-1 px-12 py-8 bg-[#F9F8F6]">
          <div className="max-w-4xl space-y-8">
            
            {/* Category Name */}
            <div className="space-y-2">
              <label className="block font-poppins font-medium text-base leading-6 text-[#75716B]">
                Category name
              </label>
              <input
                type="text"
                name="categoryName"
                value={categoryName}
                onChange={handleInputChange}
                placeholder="Enter category name"
                className="w-[480px] h-12 rounded-lg border border-[#DAD6D1] bg-white px-4 focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                required
              />
            </div>

          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default CreateCategory;

