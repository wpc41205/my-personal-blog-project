import React from 'react';
import { LinkedInIcon, GitHubIcon, EmailIcon } from './Icons';

const Footer = () => {
  return (
    <footer className="bg-[#EFEEEB] border-t border-[#DAD6D1] mt-[50px] w-full">
      <div className="flex justify-between items-center h-[144px] px-4 md:px-[120px] w-[90vw] mx-auto">
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
