import { useState, useEffect, useCallback } from 'react';
import { fetchBlogPosts } from '../services/api';
import { PAGINATION, LOADING_STATES, ERROR_MESSAGES } from '../constants';
import { validateApiParams, getErrorMessage } from '../utils';

/**
 * Custom hook for managing blog posts data
 * @param {Object} initialParams - Initial parameters for fetching posts
 * @returns {Object} Blog posts state and methods
 */
export const useBlogPosts = (initialParams = {}) => {
  const [posts, setPosts] = useState([]);
  const [loadingState, setLoadingState] = useState(LOADING_STATES.IDLE);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    totalPosts: 0,
    totalPages: 0,
    currentPage: PAGINATION.DEFAULT_PAGE,
    limit: PAGINATION.DEFAULT_LIMIT,
    nextPage: null
  });
  const [hasMore, setHasMore] = useState(true);

  /**
   * Load posts from API
   * @param {Object} params - API parameters
   * @param {boolean} isLoadMore - Whether this is loading more posts
   */
  const loadPosts = useCallback(async (params = {}, isLoadMore = false) => {
    try {
      setLoadingState(isLoadMore ? LOADING_STATES.LOADING_MORE : LOADING_STATES.LOADING);
      setError(null);

      const validatedParams = validateApiParams(params);
      const data = await fetchBlogPosts(validatedParams);

      if (isLoadMore) {
        setPosts(prevPosts => [...prevPosts, ...(data.posts || [])]);
      } else {
        setPosts(data.posts || []);
      }

      setPagination({
        totalPosts: data.totalPosts || 0,
        totalPages: data.totalPages || 0,
        currentPage: data.currentPage || PAGINATION.DEFAULT_PAGE,
        limit: data.limit || PAGINATION.DEFAULT_LIMIT,
        nextPage: data.nextPage || null
      });

      setHasMore(data.nextPage !== null);
      setLoadingState(LOADING_STATES.SUCCESS);

    } catch (err) {
      const errorMessage = getErrorMessage(err, ERROR_MESSAGES);
      setError(errorMessage);
      setLoadingState(LOADING_STATES.ERROR);
      console.error('Error loading posts:', err);
    }
  }, []);

  /**
   * Load more posts (pagination)
   * @param {Object} params - Current filter parameters
   */
  const loadMore = useCallback((params = {}) => {
    if (hasMore && loadingState !== LOADING_STATES.LOADING_MORE) {
      const nextPage = pagination.currentPage + 1;
      loadPosts({ ...params, page: nextPage }, true);
    }
  }, [hasMore, loadingState, pagination.currentPage, loadPosts]);

  /**
   * Refresh posts with new parameters
   * @param {Object} params - New parameters
   */
  const refresh = useCallback((params = {}) => {
    setHasMore(true);
    loadPosts({ ...params, page: PAGINATION.DEFAULT_PAGE });
  }, [loadPosts]);

  /**
   * Clear posts and reset state
   */
  const clear = useCallback(() => {
    setPosts([]);
    setError(null);
    setLoadingState(LOADING_STATES.IDLE);
    setPagination({
      totalPosts: 0,
      totalPages: 0,
      currentPage: PAGINATION.DEFAULT_PAGE,
      limit: PAGINATION.DEFAULT_LIMIT,
      nextPage: null
    });
    setHasMore(true);
  }, []);

  // Computed properties
  const isLoading = loadingState === LOADING_STATES.LOADING;
  const isLoadingMore = loadingState === LOADING_STATES.LOADING_MORE;
  const isError = loadingState === LOADING_STATES.ERROR;
  const isSuccess = loadingState === LOADING_STATES.SUCCESS;

  return {
    // State
    posts,
    loadingState,
    error,
    pagination,
    hasMore,
    
    // Computed properties
    isLoading,
    isLoadingMore,
    isError,
    isSuccess,
    
    // Methods
    loadPosts,
    loadMore,
    refresh,
    clear
  };
};
