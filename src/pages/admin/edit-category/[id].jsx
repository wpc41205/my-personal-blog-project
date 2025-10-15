import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { fetchAllCategories, updateCategory } from '../../../services/api';

const EditCategory = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      toast.error('Access denied. Please login first.');
      router.push('/admin/login');
      return;
    }

    if (!id) return;

    // Fetch category data
    const fetchCategory = async () => {
      try {
        setLoadingCategory(true);
        
        const categoriesData = await fetchAllCategories();
        const category = categoriesData.find(cat => cat.id === parseInt(id));
        
        if (!category) {
          toast.error('Category not found');
          router.push('/admin/category-management');
          return;
        }
        
        setCategoryName(category.name);
        
      } catch (error) {
        console.error('Error fetching category:', error);
        toast.error('Failed to load category. Please try again.');
        router.push('/admin/category-management');
      } finally {
        setLoadingCategory(false);
      }
    };

    fetchCategory();
  }, [router, id]);

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleCancel = () => {
    router.push('/admin/category-management');
  };

  const handleUpdate = async () => {
    if (!categoryName.trim()) {
      toast.error('Please enter a category name');
      return;
    }

    try {
      setLoading(true);
      
      await updateCategory(parseInt(id), { name: categoryName });
      
      toast.success('Category updated successfully!');
      router.push('/admin/category-management');
      
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Failed to update category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loadingCategory) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#26231E]"></div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar />
      <SidebarInset>
        <header className="w-full h-[96px] opacity-100 left-[280px] pt-6 pr-[60px] pb-6 pl-[60px] gap-10 border-b border-[#DAD6D1] bg-[#F9F8F6] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
            <h2 className="text-2xl font-bold text-[#26231E]">Edit category</h2>
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
              onClick={handleUpdate}
              disabled={loading}
              className="bg-[#26231E] text-white px-6 py-3 rounded-full hover:bg-[#3A342E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update'}
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

export default EditCategory;

