// Footer component for the blog
// Contains social links and copyright
import React from 'react';
import { LinkedInIcon, GitHubIcon, EmailIcon } from '../ui/Icons';

const Footer = () => {
  return (
    <footer className="bg-[#EFEEEB] border-t border-[#DAD6D1] mt-[50px] w-full h-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-32 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-[#26231E]">Get in touch</span>
          <div className="flex items-center gap-3">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#75716B] hover:text-[#26231E] transition-colors">
              <LinkedInIcon />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#75716B] hover:text-[#26231E] transition-colors">
              <GitHubIcon />
            </a>
            <a href="mailto:your.email@example.com" target="_blank" rel="noopener noreferrer" className="text-[#75716B] hover:text-[#26231E] transition-colors">
              <EmailIcon />
            </a>
          </div>
        </div>
        <div className="flex items-center">
          <a href="/" className="font-semibold text-[#75716B] hover:text-[#26231E] transition-colors">
            Home page
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
