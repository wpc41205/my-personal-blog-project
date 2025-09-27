// Navigation component
// Contains logo, menu items and mobile navigation
import React, { useState } from 'react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-brown-100 border-b border-brown-300 h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[80px]">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-bold text-brown-600">Wave Mashare</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <button 
              className="w-[127px] h-[48px] rounded-[999px] border border-brown-400 bg-white px-[40px] py-[12px] font-poppins font-medium text-base leading-6 text-brown-600 hover:bg-gray-50 transition-colors"
              onClick={() => console.log('Login clicked')}
            >
              Login
            </button>
            <button 
              className="w-[141px] h-[48px] rounded-[999px] bg-brown-600 px-[40px] py-[12px] font-poppins font-medium text-base leading-6 text-white hover:bg-brown-700 transition-colors"
              onClick={() => console.log('Sign up clicked')}
            >
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-brown-600 hover:text-brown-500 focus:outline-none focus:text-brown-500"
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
            <div className="w-full h-[200px] bg-brown-100 shadow-[2px_2px_16px_0px_rgba(0,0,0,0.1)] pt-[40px] pr-[24px] pb-[40px] pl-[24px] top-20 absolute left-0">
              <div className="space-y-[24px] flex flex-col items-center">
                <button 
                  className="w-full max-w-[327px] h-[48px] rounded-[999px] border border-brown-400 bg-white px-[40px] py-[12px] font-poppins font-medium text-base leading-6 text-brown-600 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    console.log('Mobile login clicked');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Login
                </button>
                <button 
                  className="w-full max-w-[327px] h-[48px] rounded-[999px] bg-brown-600 px-[40px] py-[12px] font-poppins font-medium text-base leading-6 text-white hover:bg-brown-700 transition-colors"
                  onClick={() => {
                    console.log('Mobile sign up clicked');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}