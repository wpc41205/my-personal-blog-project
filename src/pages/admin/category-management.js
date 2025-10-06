import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';

const CategoryManagement = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Dummy data for demonstration
  const getDummyCategories = () => [
    { id: 1, name: 'Cat', description: 'Articles about cats', articleCount: 5 },
    { id: 2, name: 'General', description: 'General articles', articleCount: 3 },
    { id: 3, name: 'Inspiration', description: 'Inspirational content', articleCount: 2 },
    { id: 4, name: 'Technology', description: 'Tech-related articles', articleCount: 8 },
    { id: 5, name: 'Lifestyle', description: 'Lifestyle tips and advice', articleCount: 4 },
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
      setCategories(getDummyCategories());
      setLoading(false);
    }, 500);
  }, [router]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All';
    const matchesCategory = categoryFilter === 'All' || category.name === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleCreateCategory = () => {
    toast.info('Navigate to create new category page');
    // router.push('/admin/categories/create');
  };

  const handleEditCategory = (id) => {
    toast.info(`Edit category with ID: ${id}`);
    // router.push(`/admin/categories/edit/${id}`);
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm(`Are you sure you want to delete category ${id}?`)) {
      toast.success(`Category ${id} deleted! (Simulated)`);
      setCategories(prev => prev.filter(category => category.id !== id));
    }
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
            <h2 className="text-2xl font-bold text-[#26231E]">Category management</h2>
          </div>
          <button
            onClick={handleCreateCategory}
            className="bg-[#26231E] text-white px-6 py-3 rounded-full flex items-center hover:bg-[#3A342E] transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create category
          </button>
        </header>
        
        <main className="flex-1 px-12 py-8 bg-[#F9F8F6]">

          <div className="flex items-center space-x-4 mb-6 pr-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-[360px] h-[48px] rounded-lg pt-3 pr-3 pb-3 pl-10 gap-1 border border-[#DAD6D1] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="w-[200px] h-[48px] rounded-lg pt-3 pr-12 pb-3 pl-3 gap-1 border border-[#DAD6D1] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B7355] appearance-none bg-no-repeat bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzY2NjY2NiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+')] bg-[length:12px] bg-[center_right_20px]"
            >
              <option value="All">Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
              className="w-[200px] h-[48px] rounded-lg pt-3 pr-12 pb-3 pl-3 gap-1 border border-[#DAD6D1] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B7355] appearance-none bg-no-repeat bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzY2NjY2NiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+')] bg-[length:12px] bg-[center_right_20px]"
            >
              <option value="All">Category</option>
              <option value="Cat">Cat</option>
              <option value="General">General</option>
              <option value="Inspiration">Inspiration</option>
            </select>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                    Articles
                  </th>
                  <th scope="col" className="relative px-6 py-3 w-24">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      Loading categories...
                    </td>
                  </tr>
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <tr key={category.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {category.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {category.articleCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleEditCategory(category.id)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => handleDeleteCategory(category.id)} className="text-red-600 hover:text-red-900">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default CategoryManagement;
