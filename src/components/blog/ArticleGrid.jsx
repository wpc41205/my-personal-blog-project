import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import SearchAndFilter from '../ui/SearchAndFilter';
import ArticleCard from './ArticleCard';
import { Button } from '../ui/button';
import { fetchBlogPosts, fetchBlogPostsByCategory, searchBlogPosts, fetchCategories } from '../../services/api';
import { DEFAULT_FILTER_OPTIONS, formatDate } from '../../constants';

/**
 * ArticleGrid component displaying filtered and searched articles
 */
const ArticleGrid = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('highlight');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_FILTER_OPTIONS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const handleViewMore = async () => {
    if (isLoading || !hasMore) return;
    
    try {
      setIsLoading(true);
      const nextPage = currentPage + 1;
      
      // Use category parameter only when not Highlight
      const categoryParam = activeCategory === "highlight" ? "" : activeCategory;
      
      const response = await fetchBlogPosts({
        page: nextPage,
        limit: 6,
        category: categoryParam
      });
      
      // Combine new posts with existing posts
      setArticles(prevArticles => [...prevArticles, ...response.posts]);
      setCurrentPage(nextPage);
      
      // Check if we have reached the last page
      if (response.currentPage >= response.totalPages) {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error loading more articles:', err);
      setError('Failed to load more articles. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setCurrentPage(1);
        setHasMore(true);
        
        // Use category parameter only when not Highlight
        const categoryParam = activeCategory === "highlight" ? "" : activeCategory;
        
        const [postsData, categoriesData] = await Promise.all([
          fetchBlogPosts({
            page: 1,
            limit: 6,
            category: categoryParam
          }),
          fetchCategories()
        ]);
        
        setArticles(postsData.posts);
        setCategories(categoriesData);
        setError(null);
        
        // Check if we have reached the last page
        if (postsData.currentPage >= postsData.totalPages) {
          setHasMore(false);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load articles. Please check your internet connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeCategory]);

  // Handle search functionality
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim().length > 0) {
      setIsSearching(true);
      setShowResults(true);
      
      try {
        const results = await searchBlogPosts(value);
        setSearchResults(results);
      } catch (err) {
        console.error('Search error:', err);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setShowResults(false);
      setSearchResults([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < searchResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev > 0 ? prev - 1 : searchResults.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && searchResults[selectedIndex]) {
        // Handle result selection
        console.log('Selected:', searchResults[selectedIndex]);
        setShowResults(false);
      }
    } else if (e.key === 'Escape') {
      setShowResults(false);
    }
  };

  const handleBlur = () => {
    // Delay hiding results to allow clicking on them
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  const handleResultSelect = (articleId) => {
    // Navigate to the selected article
    router.push(`/post/${articleId}`);
    setShowResults(false);
    setSearchTerm('');
  };

  // Filter articles based on category and search term
  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Filter by category
    if (activeCategory !== 'highlight') {
      filtered = filtered.filter(article => 
        article.category && article.category.toLowerCase() === activeCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(article =>
        (article.title && article.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (article.excerpt && article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (article.description && article.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  }, [articles, activeCategory, searchTerm]);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 ">
      {/* Section Title */}
      <h2 className="text-2xl font-semibold leading-8 text-[#26231E] mb-12 font-['Poppins']">
        Latest articles
      </h2>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <span className="ml-4 text-gray-600">Loading articles...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-red-600 underline hover:text-red-800"
          >
            Try again
          </button>
        </div>
      )}

      {/* Search and Filter Component */}
      {!loading && !error && (
        <SearchAndFilter
          searchKeyword={searchTerm}
          category={activeCategory}
          onSearchChange={handleSearchChange}
          onCategoryChange={setActiveCategory}
          searchResults={searchResults}
          isSearching={isSearching}
          showResults={showResults}
          selectedIndex={selectedIndex}
          onResultSelect={handleResultSelect}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      )}

      {/* Articles Grid */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <ArticleCard 
                  key={article.id} 
                  article={{
                    ...article,
                    date: formatDate(article.date)
                  }} 
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
              </div>
            )}
          </div>
          
          {/* View More Button */}
          {filteredArticles.length > 0 && hasMore && (
            <div className="flex justify-center mt-12">
              <Button
                variant="ghost"
                size="large"
                className="px-8 py-3 text-[#26231E] font-poppins font-medium text-base leading-6 underline disabled:opacity-50"
                onClick={handleViewMore}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'View More'}
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ArticleGrid;