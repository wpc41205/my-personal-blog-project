/**
 * Filter options for article categories
 * These will be fetched from API, but we keep defaults as fallback
 */
export const DEFAULT_FILTER_OPTIONS = [
  { value: 'highlight', label: 'Highlight' },
  { value: 'cat', label: 'Cat' },
  { value: 'inspiration', label: 'Inspiration' },
  { value: 'general', label: 'General' }
];

/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: 'https://blog-post-project-api.vercel.app',
  ENDPOINTS: {
    POSTS: '/api/posts',
    CATEGORIES: '/api/categories',
    SEARCH: '/api/posts/search'
  }
};

/**
 * Date formatting utility
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
