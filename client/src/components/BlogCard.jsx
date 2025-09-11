import React from 'react';
import { formatDate } from '../utils';
import { DIMENSIONS } from '../constants';

/**
 * BlogCard component for displaying individual blog posts
 * @param {Object} props - Component props
 * @param {string} props.image - Post image URL
 * @param {string} props.category - Post category
 * @param {string} props.title - Post title
 * @param {string} props.description - Post description
 * @param {string} props.author - Post author
 * @param {string} props.date - Post date (ISO string)
 * @param {number} props.likes - Number of likes
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler
 */
const BlogCard = ({ 
  image, 
  category, 
  title, 
  description, 
  author, 
  date, 
  likes,
  className = '',
  onClick 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick({ image, category, title, description, author, date, likes });
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <a 
        href="#" 
        className="relative h-[212px] sm:h-[360px]"
        onClick={handleClick}
      >
        <img
          className="w-full h-full object-cover rounded-md"
          src={image}
          alt={title}
          loading="lazy"
        />
      </a>
      
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600">
            {category}
          </span>
          {likes && (
            <span className="text-[#75716B] text-sm">
              ❤️ {likes}
            </span>
          )}
        </div>
        
        <a href="#" onClick={handleClick}>
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
          <span className="text-[#75716B]">{formatDate(date)}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
