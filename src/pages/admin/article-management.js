import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import { fetchBlogPosts, fetchCategories, deleteArticle, updateArticle } from '../../services/api';

const ArticleManagement = () => {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [categories, setCategories] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, articleId: null, articleTitle: '' });

  // Dummy data for demonstration - moved inside component to avoid dependency issue
  const getDummyArticles = () => [
    { id: 1, title: 'Understanding Cat Behavior: Why Your Feline Friend Acts the Way They D..', category: 'Cat', status: 'Published' },
    { id: 2, title: 'The Fascinating World of Cats: Why We Love Our Furry Friends', category: 'Cat', status: 'Published' },
    { id: 3, title: 'Finding Motivation: How to Stay Inspired Through Life\'s Challenges', category: 'General', status: 'Published' },
    { id: 4, title: 'The Science of the Cat\'s Purr: How It Benefits Cats and Humans Alike', category: 'Cat', status: 'Published' },
    { id: 5, title: 'Top 10 Health Tips to Keep Your Cat Happy and Healthy', category: 'Cat', status: 'Published' },
    { id: 6, title: 'Unlocking Creativity: Simple Habits to Spark Inspiration Daily', category: 'Inspiration', status: 'Published' },
  ];

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      toast.error('Access denied. Please login first.');
      router.push('/admin/login');
      return;
    }

    // Fetch real data from API
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch articles and categories
        const [articlesData, categoriesData] = await Promise.all([
          fetchBlogPosts({ page: 1, limit: 50 }), // Fetch more articles for admin
          fetchCategories()
        ]);
        
        // Transform API data to match our table structure
        const transformedArticles = articlesData.posts.map(post => ({
          id: post.id,
          title: post.title,
          category: post.category,
          status: post.status || 'Published', // Default to Published if not specified
          date: post.date,
          author: post.author
        }));
        
        setArticles(transformedArticles);
        setCategories(categoriesData);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load articles. Using fallback data.');
        
        // Fallback to dummy data if API fails
        setArticles(getDummyArticles());
        setCategories(['Cat', 'General', 'Inspiration']);
        
        toast.warning('Using fallback data. Check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || article.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || article.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleCreateArticle = () => {
    router.push('/admin/create-article');
  };

  const handleEditArticle = (id) => {
    router.push(`/admin/edit-article/${id}`);
  };

  const handleDeleteArticle = (id, title) => {
    setDeleteModal({ isOpen: true, articleId: id, articleTitle: title });
  };

  const confirmDelete = async () => {
    const { articleId } = deleteModal;
    try {
      await deleteArticle(articleId);
      toast.success('Article deleted successfully!');
      setArticles(prev => prev.filter(article => article.id !== articleId));
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Failed to delete article. Please try again.');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const article = articles.find(a => a.id === id);
      if (!article) return;

      await updateArticle(id, { ...article, status: newStatus });
      toast.success(`Article status updated to ${newStatus}`);
      
      setArticles(prev => prev.map(article => 
        article.id === id ? { ...article, status: newStatus } : article
      ));
    } catch (error) {
      console.error('Error updating article status:', error);
      toast.error('Failed to update article status. Please try again.');
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
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar />
      <SidebarInset>
        <header className="w-full h-[96px] opacity-100 left-[280px] pt-6 pr-[60px] pb-6 pl-[60px] gap-10 border-b border-[#DAD6D1] bg-[#F9F8F6] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
            <h2 className="text-2xl font-bold text-[#26231E]">Article management</h2>
          </div>
          <button
            onClick={handleCreateArticle}
            className="bg-[#26231E] text-white px-6 py-3 rounded-full flex items-center hover:bg-[#3A342E] transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create article
          </button>
        </header>
        
        <main className="flex-1 px-12 py-8 bg-[#F9F8F6]">

        <div className="flex items-center space-x-4 mb-6 pr-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search..."
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
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>

          <select
            value={categoryFilter}
            onChange={handleCategoryFilterChange}
            className="w-[200px] h-[48px] rounded-lg pt-3 pr-12 pb-3 pl-3 gap-1 border border-[#DAD6D1] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B7355] appearance-none bg-no-repeat bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzY2NjY2NiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+')] bg-[length:12px] bg-[center_right_20px]"
          >
            <option value="All">Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-base font-medium text-[#75716B] w-2/5">
                  Article title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-base font-medium text-[#75716B] w-32">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-base font-medium text-[#75716B] w-32">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3 w-24">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr className="bg-white">
                  <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#26231E] mr-2"></div>
                      Loading articles...
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr className="bg-white">
                  <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center text-sm text-red-500">
                    {error}
                  </td>
                </tr>
              ) : filteredArticles.length === 0 ? (
                <tr className="bg-white">
                  <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    No articles found.
                  </td>
                </tr>
              ) : (
                filteredArticles.map((article, index) => (
                  <tr key={article.id} className={index % 2 === 0 ? "bg-[#EFEEEB]" : "bg-[#F9F8F6]"}>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="truncate text-[#43403B] font-['Poppins'] font-medium text-base leading-6" title={article.title}>
                        {article.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[#43403B] font-['Poppins'] font-medium text-base leading-6">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center text-green-600 font-['Poppins'] font-medium text-base leading-6">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleEditArticle(article.id)} className="mr-3 text-[#26231E] hover:text-[#8B7355]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDeleteArticle(article.id, article.title)} className="text-[#26231E] hover:text-red-600">
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

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, articleId: null, articleTitle: '' })}
        onConfirm={confirmDelete}
        title="Delete article"
        message="Do you want to delete this article?"
      />
    </SidebarProvider>
  );
};

export default ArticleManagement;
