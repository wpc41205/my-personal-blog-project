// Simple test to verify API service functionality
import { fetchBlogPosts } from './api.js';

// Test function to verify API connection
export const testAPI = async () => {
  try {
    console.log('Testing API connection...');
    const data = await fetchBlogPosts({ page: 1, limit: 3 });
    console.log('API Test Results:', {
      totalPosts: data.totalPosts,
      currentPage: data.currentPage,
      postsCount: data.posts?.length || 0,
      firstPostTitle: data.posts?.[0]?.title || 'No posts'
    });
    return true;
  } catch (error) {
    console.error('API Test Failed:', error);
    return false;
  }
};

// Uncomment the line below to run the test
// testAPI();
