/**
 * Utility functions for common operations
 */

/**
 * Format date from ISO string to readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + suffix;
};

/**
 * Validate API parameters
 * @param {Object} params - Parameters to validate
 * @returns {Object} Validated parameters
 */
export const validateApiParams = (params = {}) => {
  const validated = {};
  
  if (params.page && typeof params.page === 'number' && params.page > 0) {
    validated.page = params.page;
  }
  
  if (params.limit && typeof params.limit === 'number' && params.limit > 0 && params.limit <= 50) {
    validated.limit = params.limit;
  }
  
  if (params.category && typeof params.category === 'string' && params.category.trim()) {
    validated.category = params.category.trim();
  }
  
  if (params.keyword && typeof params.keyword === 'string' && params.keyword.trim()) {
    validated.keyword = params.keyword.trim();
  }
  
  return validated;
};

/**
 * Create URL with query parameters
 * @param {string} baseUrl - Base URL
 * @param {Object} params - Query parameters
 * @returns {string} Complete URL with query string
 */
export const createUrlWithParams = (baseUrl, params = {}) => {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      queryParams.append(key, value);
    }
  });
  
  const queryString = queryParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

/**
 * Debounce function to limit API calls
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Check if error is a network error
 * @param {Error} error - Error object
 * @returns {boolean} True if network error
 */
export const isNetworkError = (error) => {
  return !navigator.onLine || 
         error.name === 'TypeError' || 
         error.message.includes('fetch') ||
         error.message.includes('network');
};

/**
 * Get appropriate error message based on error type
 * @param {Error} error - Error object
 * @param {Object} errorMessages - Custom error messages
 * @returns {string} Error message
 */
export const getErrorMessage = (error, errorMessages = {}) => {
  if (isNetworkError(error)) {
    return errorMessages.NETWORK_ERROR || 'Network error. Please check your connection.';
  }
  
  if (error.status === 404) {
    return errorMessages.POST_NOT_FOUND || 'Post not found.';
  }
  
  if (error.status >= 500) {
    return errorMessages.API_ERROR || 'Server error. Please try again later.';
  }
  
  return error.message || errorMessages.UNKNOWN_ERROR || 'An unexpected error occurred.';
};


/**
 * Generate unique ID
 * @returns {string} Unique identifier
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};
