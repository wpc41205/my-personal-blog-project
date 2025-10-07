import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { fetchCategories, updateArticle, fetchBlogPosts } from '../../../services/api';

const EditArticle = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    introduction: '',
    content: '',
    category: '',
    author: 'Pataveekorn C.',
    thumbnail: null,
    existingImage: null
  });

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      toast.error('Access denied. Please login first.');
      router.push('/admin/login');
      return;
    }

    if (!id) return;

    // Fetch article data and categories
    const fetchData = async () => {
      try {
        setLoadingArticle(true);
        
        // Fetch categories
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);

        // Fetch all articles and find the one with matching ID
        const articlesData = await fetchBlogPosts({ page: 1, limit: 100 });
        const article = articlesData.posts.find(post => post.id === id);
        
        if (!article) {
          toast.error('Article not found');
          router.push('/admin/article-management');
          return;
        }

        // Check if article is from external source
        if (article.source === 'external') {
          toast.error('Cannot edit articles from external API');
          router.push('/admin/article-management');
          return;
        }

        // Populate form with article data
        setFormData({
          title: article.title || '',
          introduction: article.description || '',
          content: article.content || '',
          category: article.category || '',
          author: article.author || 'Pataveekorn C.',
          thumbnail: null,
          existingImage: article.image || article.thumbnail
        });
        
      } catch (error) {
        console.error('Error fetching article:', error);
        toast.error('Failed to load article. Please try again.');
        router.push('/admin/article-management');
      } finally {
        setLoadingArticle(false);
      }
    };

    fetchData();
  }, [router, id]);

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
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        thumbnail: file
      }));
      
      toast.success('Image uploaded successfully');
    }
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      const articleData = {
        title: formData.title,
        introduction: formData.introduction,
        content: formData.content,
        category: formData.category,
        thumbnail: formData.thumbnail || formData.existingImage
      };

      await updateArticle(id, articleData);
      toast.success('Article updated successfully!');
      router.push('/admin/article-management');
      
    } catch (error) {
      console.error('Error updating article:', error);
      toast.error('Failed to update article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return false;
    }
    if (!formData.introduction.trim()) {
      toast.error('Please enter an introduction');
      return false;
    }
    if (!formData.content.trim()) {
      toast.error('Please enter content');
      return false;
    }
    if (!formData.category) {
      toast.error('Please select a category');
      return false;
    }
    if (formData.introduction.length > 120) {
      toast.error('Introduction must be 120 characters or less');
      return false;
    }
    return true;
  };

  const getImagePreview = () => {
    if (formData.thumbnail) {
      return URL.createObjectURL(formData.thumbnail);
    }
    if (formData.existingImage) {
      return formData.existingImage;
    }
    return null;
  };

  if (loadingArticle) {
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
            <h2 className="text-2xl font-bold text-[#26231E]">Edit article</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/admin/article-management')}
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
              {loading ? 'Updating...' : 'Update article'}
            </button>
          </div>
        </header>
        
        <main className="flex-1 px-12 py-8 bg-[#F9F8F6]">
          <div className="max-w-4xl space-y-8">
            
            {/* Thumbnail Image Section */}
            <div className="space-y-4">
              <label
                className="block font-poppins font-medium text-base leading-6 text-[#75716B]"
                >
                Thumbnail Image
              </label>
              <div className="relative w-[460px]">
                <div
                  className="relative w-[460px] h-[260px] flex items-center justify-center bg-[#EFEEEB] rounded-lg border border-dashed border-[#DAD6D1] opacity-100 pt-3 pr-4 pb-3 pl-4 gap-[10px]"
                >
                  {getImagePreview() ? (
                    <img
                      src={getImagePreview()}
                      alt="Thumbnail preview"
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg className="h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  {getImagePreview() && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData(prev => ({ ...prev, thumbnail: null, existingImage: null }));
                      }}
                      className="absolute top-3 right-3 text-[#26231E] rounded-full p-2 hover:bg-white/50 transition-colors z-30"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => document.querySelector('input[type="file"]').click()}
                    className="absolute bottom-0 left-120 w-[283px] h-12 bg-white text-[#26231E] py-3 px-10 gap-1.5 rounded-full border border-[#75716B] opacity-100 hover:bg-gray-50 transition-colors z-20"
                  >
                    Upload thumbnail image
                  </button>
                </div>
              </div>
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <label className="block font-poppins font-medium text-base leading-6 text-[#75716B]">
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-[480px] h-12 py-3 pr-10 pl-4 gap-1 rounded-lg border border-[#DAD6D1] bg-white opacity-100 focus:outline-none focus:ring-2 focus:ring-[#8B7355] appearance-none"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Author Name */}
            <div className="space-y-2">
              <label className="block font-poppins font-medium text-base leading-6 text-[#75716B]">
                Author name
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-[480px] h-12 py-3 pr-3 pl-4 gap-1 rounded-lg border border-[#DAD6D1] bg-white opacity-100 focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                readOnly
              />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label className="block font-poppins font-medium text-base leading-6 text-[#75716B]">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Article title"
                className="w-full h-12 rounded-lg border border-[#DAD6D1] bg-white px-3 focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                required
              />
            </div>

            {/* Introduction */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-[#26231E]">
                Introduction <span className="text-sm text-gray-500">[max 120 letters]</span>
              </label>
              <textarea
                name="introduction"
                value={formData.introduction}
                onChange={handleInputChange}
                placeholder="Introduction"
                rows={4}
                maxLength={120}
                className="w-full rounded-lg border border-[#DAD6D1] bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B7355] resize-none"
                required
              />
              <div className="text-sm text-gray-500 text-right">
                {formData.introduction.length}/120 characters
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-[#26231E]">
                Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Content"
                rows={12}
                className="w-full rounded-lg border border-[#DAD6D1] bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B7355] resize-none"
                required
              />
            </div>

          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default EditArticle;

