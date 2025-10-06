import React, { useRef } from 'react';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import { SearchIcon } from './Icons';
import { DEFAULT_FILTER_OPTIONS } from '../../constants';

const SearchAndFilter = ({
  searchKeyword,
  category,
  onSearchChange,
  onCategoryChange,
  searchResults = [],
  isSearching = false,
  showResults = false,
  selectedIndex = -1,
  onResultSelect,
  onKeyDown,
  onBlur,
  className = ''
}) => {
  const searchContainerRef = useRef(null);

  const SearchIconButton = (
    <button 
      type="button"
      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-white hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <SearchIcon />
    </button>
  );

  return (
    <div className={`flex flex-col lg:flex-row lg:justify-between lg:items-center w-full mt-6 lg:h-16 px-4 lg:px-6 py-3 lg:py-0 rounded-lg bg-[#F5F3F0] ${className}`}>
      {/* Filter Buttons - Desktop */}
      <div className="hidden lg:flex flex-wrap gap-3 mb-0">
        {DEFAULT_FILTER_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant={option.value === category ? 'highlight' : 'ghost'}
            size="small"
            className="px-4 py-2 text-sm font-medium"
            disabled={option.value === category}
            onClick={() => onCategoryChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Search Input with Results Dropdown */}
      <div className="relative w-full lg:w-auto mb-4 lg:mb-0" ref={searchContainerRef}>
        <Input 
          type="text" 
          placeholder="Search"
          className="w-full lg:w-[320px] h-10"
          icon={SearchIconButton}
          value={searchKeyword}
          onChange={onSearchChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
        
        {/* Search Results Dropdown */}
        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
            {isSearching ? (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto mb-2"></div>
                Searching...
              </div>
            ) : searchResults.length > 0 ? (
              <div className="py-2">
                {searchResults.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => onResultSelect && onResultSelect(result.id)}
                    className={`w-full px-4 py-3 text-left hover:bg-[#EFEEEB] transition-colors ${
                      index === selectedIndex ? 'bg-[#EFEEEB]' : ''
                    }`}
                  >
                    <div className="font-medium text-[#26231E] text-sm mb-1">
                      {result.title}
                    </div>
                    <div className="text-xs text-[#75716B]">
                      {result.category}
                    </div>
                  </button>
                ))}
              </div>
            ) : searchKeyword.trim().length > 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                No articles found for &ldquo;{searchKeyword}&rdquo;
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Filter Dropdown - Mobile */}
      <div className="lg:hidden w-full">
        <label className="block text-[#75716B] mb-2 text-[16px] font-medium leading-[24px]">
          Category
        </label>
        <Select 
          options={DEFAULT_FILTER_OPTIONS}
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-3 py-2 text-sm"
        />
      </div>
    </div>
  );
};

export default SearchAndFilter;
