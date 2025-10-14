import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * ArticleCard component for displaying individual blog articles
 */
const ArticleCard = ({ article }) => {

  return (
    <Link href={`/post/${article.id}`} className="block w-full space-y-4 group cursor-pointer">
      {/* Image Container */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="h-[360px] bg-gray-200 overflow-hidden">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              width={400}
              height={360}
              style={{ width: 'auto', height: 'auto' }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No Image</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Content Container */}
      <div className="w-full">
        {/* Category Tag */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-[#D7F2E9] text-[#12B279] text-xs font-medium rounded-full">
            {article.category}
          </span>
        </div>
        
        {/* Article Title */}
        <h3 className="text-lg font-bold text-[#26231E] mb-3 line-clamp-2 leading-tight group-hover:text-[#12B279] transition-colors duration-200">
          {article.title}
        </h3>
        
        {/* Article Excerpt */}
        <p className="text-[#75716B] text-sm leading-relaxed mb-4 line-clamp-3">
          {article.description || article.excerpt}
        </p>
        
        {/* Article Meta */}
        <div className="flex items-center gap-3 text-sm text-[#75716B]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden">
              <Image 
                src="/me.jpg" 
                alt="Author" 
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-medium">{article.author}</span>
          </div>
          <div className="w-px h-4"></div>
          <span>{article.date}</span>
        </div>
      </div>
  
    </Link>
  );
};

export default ArticleCard;