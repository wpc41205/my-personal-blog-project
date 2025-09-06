import React from 'react';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import { SearchIcon } from './Icons';
import { COLORS, FONTS, FILTER_OPTIONS } from '../constants';

function Articles() {
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
            <h1 className={`mt-10 text-2xl font-semibold leading-8 text-[${COLORS.primary}]`}>
                Latest Articles
            </h1>
            
            {/* Filter and Search Container */}
            <div className={`flex flex-col lg:flex-row lg:justify-between lg:items-center w-full mt-6 lg:h-20 px-4 lg:px-6 py-4 lg:py-0 rounded-lg bg-[${COLORS.lightBackground}]`}>
                {/* Filter Buttons - Desktop */}
                <div className="hidden lg:flex flex-wrap gap-4 mb-0">
                    {FILTER_OPTIONS.map((option) => (
                        <Button
                            key={option.value}
                            variant="ghost"
                            size="small"
                            className="px-6 py-2"
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
                    <label className={`block text-base font-medium text-[${COLORS.primary}] mb-2`}>
                        Category
                    </label>
                    <Select 
                        options={FILTER_OPTIONS}
                        className="w-full px-4 py-3"
                    />
                </div>
            </div>
        </div>
    );
}

export default Articles;