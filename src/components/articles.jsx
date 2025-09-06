import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import { SearchIcon } from './Icons';
import { FILTER_OPTIONS } from '../constants';
import { blogPosts } from '../data/blogPosts';

function Articles() {
    const [category, setCategory] = useState("highlight");
    const SearchIconButton = (
        <button 
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <SearchIcon />
        </button>
    );

    return (
        <div className="flex flex-col items-start justify-start w-[80vw] mx-auto">
            <h1 className="mt-10 text-2xl font-semibold leading-8 text-[#26231E]">
                Latest Articles
            </h1>
            
            {/* Filter and Search Container */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full mt-6 lg:h-20 px-4 lg:px-6 py-4 lg:py-0 rounded-lg bg-[#F5F3F0]">
                {/* Filter Buttons - Desktop */}
                <div className="hidden lg:flex flex-wrap gap-4 mb-0">
                    {FILTER_OPTIONS.map((option) => (
                        <Button
                            key={option.value}
                            variant={option.value === category ? 'highlight' : 'ghost'}
                            size="small"
                            className="px-6 py-2"
                            disabled={option.value === category}
                            onClick={() => setCategory(option.value)}
                        >
                            {option.label}
                        </Button>
                    ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full lg:w-auto mb-4 lg:mb-0">
                    <Input 
                        type="text" 
                        placeholder="Search"
                        className="w-full lg:w-[360px] h-12"
                        icon={SearchIconButton}
                    />
                </div>

                {/* Filter Dropdown - Mobile */}
                <div className="lg:hidden w-full">
                    <label className="block text-[#75716B] mb-2 text-[16px] font-medium leading-[24px]">
                        Category
                    </label>
                    <Select 
                        options={FILTER_OPTIONS}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3"
                    />
                </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8 mt-8">
                {blogPosts.map((post, index) => (
                    <BlogCard
                        key={index}
                        image={post.image}
                        category={post.category}
                        title={post.title}
                        description={post.description}
                        author={post.author}
                        date={post.date}
                    />
                ))}
            </div>

            {/* View More Button */}
            <div className="flex justify-center w-full mt-12">
                <Button
                    variant="outline"
                    size="large"
                    className="px-8 py-3 text-[#26231E] font-medium text-base leading-6 underline decoration-solid cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => {
                        // Add your click handler logic here
                        console.log('View More clicked');
                        // You can add navigation, load more articles, etc.
                    }}
                >
                    View More
                </Button>
            </div>
        </div>
    );
}

function BlogCard({ image, category, title, description, author, date }) {
    return (
      <div className="flex flex-col gap-4">
        <a href="#" className="relative h-[212px] sm:h-[360px]">
          <img
            className="w-full h-full object-cover rounded-md"
            src={image}
            alt={title}
          />
        </a>
        <div className="flex flex-col">
          <div className="flex">
            <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
              {category}
            </span>
          </div>
          <a href="#">
            <h2 className="font-bold text-xl mb-2 line-clamp-2 hover:underline">
              {title}
            </h2>
          </a>
          <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3 text-[#75716B]">
            {description}
          </p>
          <div className="flex items-center text-sm">
            <img
              className="w-8 h-8 rounded-full mr-2"
              src="/src/assets/me.jpg"
              alt={author}
            />
            <span className="text-black font-medium">{author}</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-[#75716B]">{date}</span>
          </div>
        </div>
      </div>
    );
  }

export default Articles;