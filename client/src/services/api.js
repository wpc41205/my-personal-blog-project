import { API_CONFIG, ERROR_MESSAGES } from '../constants';
import { createUrlWithParams, getErrorMessage } from '../utils';

/**
 * Create a fetch request with timeout and error handling
 * @param {string} url - Request URL
 * @param {Object} options - Fetch options
 * @returns {Promise<Response>} Fetch response
 */
const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};

/**
 * Handle API response and extract data
 * @param {Response} response - Fetch response
 * @returns {Promise<Object>} Parsed response data
 */
const handleApiResponse = async (response) => {
  if (!response.ok) {
    const error = new Error(`HTTP error! status: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Invalid JSON response');
  }
};

/**
 * Fetch blog posts from the API with optional query parameters
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Number of posts per page (default: 6)
 * @param {string} params.category - Filter by category
 * @param {string} params.keyword - Search keyword
 * @returns {Promise<Object>} API response with posts and pagination info
 */
export const fetchBlogPosts = async (params = {}) => {
  try {
    const url = createUrlWithParams(`${API_CONFIG.BASE_URL}/posts`, params);
    const response = await fetchWithTimeout(url);
    const data = await handleApiResponse(response);
    
    // Validate response structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format');
    }

    return {
      posts: data.posts || [],
      totalPosts: data.totalPosts || 0,
      totalPages: data.totalPages || 0,
      currentPage: data.currentPage || 1,
      limit: data.limit || API_CONFIG.DEFAULT_PAGE_SIZE,
      nextPage: data.nextPage || null
    };
  } catch (error) {
    const errorMessage = getErrorMessage(error, ERROR_MESSAGES);
    console.error('Error fetching blog posts:', error);
    throw new Error(errorMessage);
  }
};

/**
 * Fetch a single blog post by ID
 * @param {number|string} id - Post ID
 * @returns {Promise<Object>} Single post data
 */
export const fetchBlogPost = async (id) => {
  try {
    if (!id) {
      throw new Error('Post ID is required');
    }

    const url = `${API_CONFIG.BASE_URL}/posts/${id}`;
    const response = await fetchWithTimeout(url);
    const data = await handleApiResponse(response);
    
    // Validate response structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format');
    }

    return data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, ERROR_MESSAGES);
    console.error('Error fetching blog post:', error);
    throw new Error(errorMessage);
  }
};

/**
 * Test API connection
 * @returns {Promise<boolean>} True if API is accessible
 */
export const testApiConnection = async () => {
  try {
    const response = await fetchWithTimeout(`${API_CONFIG.BASE_URL}/posts?limit=1`);
    return response.ok;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
};
