// Navigation component
// Contains logo, menu items and mobile navigation
import React, { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[#F9F8F6] border-b border-[#DAD6D1] h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[80px]">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-1">
              <span className="text-2xl font-bold text-[#26231E]">Wave Mashare</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Link href="/login">
              <button className="w-[127px] h-[48px] rounded-[999px] border border-[#DAD6D1] bg-white px-[40px] py-[12px] font-poppins font-medium text-base leading-6 text-[#26231E] hover:bg-gray-50 transition-colors">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="w-[141px] h-[48px] rounded-[999px] bg-[#26231E] px-[40px] py-[12px] font-poppins font-medium text-base leading-6 text-white hover:bg-[#3A342E] transition-colors">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-[#26231E] hover:text-[#75716B] focus:outline-none focus:text-[#75716B]"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="w-full h-[200px] bg-[#F9F8F6] shadow-[2px_2px_16px_0px_rgba(0,0,0,0.1)] pt-[40px] pr-[24px] pb-[40px] pl-[24px] top-20 absolute left-0">
              <div className="space-y-[24px] flex flex-col items-center">
                <Link href="/login" className="w-full">
                  <button 
                    className="w-full max-w-[327px] h-[48px] rounded-[999px] border border-[#DAD6D1] bg-white px-[40px] py-[12px] font-poppins font-medium text-base leading-6 text-[#26231E] hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </button>
                </Link>
                <Link href="/register" className="w-full">
                  <button 
                    className="w-full max-w-[327px] h-[48px] rounded-[999px] bg-[#26231E] px-[40px] py-[12px] font-poppins font-medium text-base leading-6 text-white hover:bg-[#3A342E] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}