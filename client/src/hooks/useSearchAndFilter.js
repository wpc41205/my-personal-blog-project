import { useState, useCallback, useMemo } from 'react';
import { debounce } from '../utils';

/**
 * Custom hook for managing search and filter state
 * @param {Object} options - Configuration options
 * @param {Function} options.onSearchChange - Callback when search changes
 * @param {Function} options.onFilterChange - Callback when filter changes
 * @param {number} options.debounceDelay - Debounce delay for search
 * @returns {Object} Search and filter state and methods
 */
export const useSearchAndFilter = (options = {}) => {
  const {
    onSearchChange,
    onFilterChange,
    debounceDelay = 300
  } = options;

  const [searchKeyword, setSearchKeyword] = useState('');
  const [category, setCategory] = useState('highlight');

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((keyword) => {
      if (onSearchChange) {
        onSearchChange(keyword);
      }
    }, debounceDelay),
    [onSearchChange, debounceDelay]
  );

  /**
   * Handle search input change
   * @param {Event} event - Input change event
   */
  const handleSearchChange = useCallback((event) => {
    const value = event.target.value;
    setSearchKeyword(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  /**
   * Handle category filter change
   * @param {string} newCategory - New category value
   */
  const handleCategoryChange = useCallback((newCategory) => {
    setCategory(newCategory);
    if (onFilterChange) {
      onFilterChange(newCategory);
    }
  }, [onFilterChange]);

  /**
   * Reset search and filter to default values
   */
  const reset = useCallback(() => {
    setSearchKeyword('');
    setCategory('highlight');
    if (onSearchChange) onSearchChange('');
    if (onFilterChange) onFilterChange('highlight');
  }, [onSearchChange, onFilterChange]);

  /**
   * Get current filter parameters for API calls
   * @returns {Object} Filter parameters
   */
  const getFilterParams = useCallback(() => {
    const params = {};
    
    if (category && category.trim() && category !== 'highlight') {
      params.category = category;
    }
    
    if (searchKeyword && searchKeyword.trim()) {
      params.keyword = searchKeyword.trim();
    }
    
    return params;
  }, [category, searchKeyword]);

  return {
    // State
    searchKeyword,
    category,
    
    // Methods
    handleSearchChange,
    handleCategoryChange,
    reset,
    getFilterParams,
    
    // Setters (for external control)
    setSearchKeyword,
    setCategory
  };
};
