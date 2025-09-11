import React, { useEffect } from 'react';
import Button from './Button';
import BlogCard from './BlogCard';
import SearchAndFilter from './SearchAndFilter';
import { LoadingState, LoadingMoreState, ErrorState, EmptyState } from './LoadingStates';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useSearchAndFilter } from '../hooks/useSearchAndFilter';
import { PAGINATION } from '../constants';

function Articles() {
    // Custom hooks for state management
    const {
        posts,
        loadingState,
        error,
        pagination,
        hasMore,
        isLoading,
        isLoadingMore,
        isError,
        loadPosts,
        loadMore,
        refresh
    } = useBlogPosts();

    const {
        searchKeyword,
        category,
        handleSearchChange,
        handleCategoryChange,
        getFilterParams
    } = useSearchAndFilter({
        onSearchChange: (keyword) => {
            const params = getFilterParams();
            refresh({ ...params, keyword });
        },
        onFilterChange: (newCategory) => {
            const params = getFilterParams();
            refresh({ ...params, category: newCategory });
        }
    });

    // Load initial posts
    useEffect(() => {
        const initialParams = getFilterParams();
        loadPosts({ ...initialParams, page: PAGINATION.DEFAULT_PAGE });
    }, []);

    // Handle view more (load next page)
    const handleViewMore = () => {
        const params = getFilterParams();
        loadMore(params);
    };

    return (
        <div className="flex flex-col items-start justify-start w-[80vw] mx-auto">
            <h1 className="mt-10 text-2xl font-semibold leading-8 text-[#26231E]">
                Latest Articles
            </h1>
            
            {/* Search and Filter Component */}
            <SearchAndFilter
                searchKeyword={searchKeyword}
                category={category}
                onSearchChange={handleSearchChange}
                onCategoryChange={handleCategoryChange}
            />

            {/* Loading State */}
            <LoadingState loadingState={loadingState} />

            {/* Error State */}
            <ErrorState error={error} onRetry={() => refresh(getFilterParams())} />

            {/* Blog Posts Grid */}
            {!isLoading && !isError && posts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8 mt-8">
                    {posts.map((post) => (
                        <BlogCard
                            key={post.id}
                            image={post.image}
                            category={post.category}
                            title={post.title}
                            description={post.description}
                            author={post.author}
                            date={post.date}
                            likes={post.likes}
                        />
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!isLoading && !isError && posts.length === 0 && (
                <EmptyState />
            )}

            {/* Pagination and View More */}
            {!isLoading && !isError && posts.length > 0 && (
                <div className="flex flex-col items-center w-full mt-12 gap-4">
                    {/* Pagination Info */}
                    <div className="text-[#75716B] text-sm">
                        Showing {posts.length} of {pagination.totalPosts} posts
                    </div>
                    
                    {/* Loading More State */}
                    <LoadingMoreState loadingState={loadingState} />
                    
                    {/* View More Button */}
                    {hasMore && !isLoadingMore && (
                        <Button
                            variant="ghost"
                            size="large"
                            className="px-8 py-3 text-[#26231E] font-medium text-base leading-6 underline"
                            onClick={handleViewMore}
                        >
                            View More
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Articles;