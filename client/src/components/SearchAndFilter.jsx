import React from 'react';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import { SearchIcon } from './Icons';
import { FILTER_OPTIONS } from '../constants';

/**
 * SearchAndFilter component for handling search and category filtering
 * @param {Object} props - Component props
 * @param {string} props.searchKeyword - Current search keyword
 * @param {string} props.category - Current selected category
 * @param {Function} props.onSearchChange - Search input change handler
 * @param {Function} props.onCategoryChange - Category change handler
 * @param {string} props.className - Additional CSS classes
 */
const SearchAndFilter = ({
  searchKeyword,
  category,
  onSearchChange,
  onCategoryChange,
  className = ''
}) => {
  const SearchIconButton = (
    <button 
      type="button"
      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <SearchIcon />
    </button>
  );

  return (
    <div className={`flex flex-col lg:flex-row lg:justify-between lg:items-center w-full mt-6 lg:h-20 px-4 lg:px-6 py-4 lg:py-0 rounded-lg bg-[#F5F3F0] ${className}`}>
      {/* Filter Buttons - Desktop */}
      <div className="hidden lg:flex flex-wrap gap-4 mb-0">
        {FILTER_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant={option.value === category ? 'highlight' : 'ghost'}
            size="small"
            className="px-6 py-2 font-medium"
            disabled={option.value === category}
            onClick={() => onCategoryChange(option.value)}
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
          value={searchKeyword}
          onChange={onSearchChange}
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
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-3"
        />
      </div>
    </div>
  );
};

export default SearchAndFilter;
