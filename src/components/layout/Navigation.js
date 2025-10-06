// Navigation component
// Contains logo, menu items and mobile navigation
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      setIsUserMenuOpen(false);
      setIsMobileMenuOpen(false);
      
      // Show success message
      toast.success('Logged out successfully!');
      
      // Navigate to login page after successful logout
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Unable to log out. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

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

          {/* Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Notification Bell */}
                <div className="relative">
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                    </svg>
                    {/* Notification Badge */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                  </button>
                </div>

                {/* User Profile */}
                <div className="relative user-menu-container">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                      <img 
                        src={
                          user?.avatar_url && 
                          user.avatar_url.startsWith('https://') && 
                          user.avatar_url.includes('supabase.co') &&
                          user.avatar_url.includes('/storage/v1/object/public/')
                            ? user.avatar_url 
                            : "/imgdefault.png"
                        } 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        onLoad={() => console.log('Nav image loaded:', user?.avatar_url || "/imgdefault.png")}
                        onError={(e) => {
                          console.log('Nav image failed:', user?.avatar_url || "/imgdefault.png");
                          e.target.src = "/imgdefault.png";
                        }}
                      />
                    </div>
                    <span className="font-medium text-gray-800 text-sm">
                      {user.name || user.username}
                    </span>
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                    <div className="py-2">
                      <Link href="/profile">
                        <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors">
                          <div className="w-5 h-5 flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <span className="font-medium">Profile</span>
                        </button>
                      </Link>
                      <Link href="/reset-password">
                        <button 
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <div className="w-5 h-5 flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                          </div>
                          <span className="font-medium">Reset password</span>
                        </button>
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button 
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className={`w-full text-left px-4 py-3 text-sm flex items-center space-x-3 transition-colors ${
                          isLoggingOut 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="w-5 h-5 flex items-center justify-center">
                          {isLoggingOut ? (
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium">
                          {isLoggingOut ? 'Logging out...' : 'Log out'}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
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
            <div className="w-full bg-[#F9F8F6] shadow-[2px_2px_16px_0px_rgba(0,0,0,0.1)] pt-[40px] pr-[24px] pb-[40px] pl-[24px] top-20 absolute left-0">
              <div className="space-y-[24px] flex flex-col items-center">
                {user ? (
                  <>
                    <div className="flex items-center space-x-3 mb-6 px-2">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                        <img 
                          src={
                            user?.avatar_url && 
                            user.avatar_url.startsWith('https://') && 
                            user.avatar_url.includes('supabase.co') &&
                            user.avatar_url.includes('/storage/v1/object/public/')
                              ? user.avatar_url 
                              : "/imgdefault.png"
                          } 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                          onLoad={() => console.log('Mobile nav image loaded:', user?.avatar_url || "/imgdefault.png")}
                          onError={(e) => {
                            console.log('Mobile nav image failed:', user?.avatar_url || "/imgdefault.png");
                            e.target.src = "/imgdefault.png";
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-lg text-gray-800">
                          {user.name || user.username}
                        </p>
                        <p className="text-sm text-gray-600">
                          {user.email || 'user@example.com'}
                        </p>
                      </div>
                    </div>
                    <Link href="/profile" className="w-full">
                      <button 
                        className="w-full max-w-[327px] h-[48px] rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Profile</span>
                      </button>
                    </Link>
                    <Link href="/reset-password" className="w-full">
                      <button 
                        className="w-full max-w-[327px] h-[48px] rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        <span>Reset password</span>
                      </button>
                    </Link>
                    <button 
                      disabled={isLoggingOut}
                      className={`w-full max-w-[327px] h-[48px] rounded-xl px-6 py-3 font-medium transition-colors flex items-center justify-center space-x-2 ${
                        isLoggingOut 
                          ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {isLoggingOut ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      )}
                      <span>{isLoggingOut ? 'Logging out...' : 'Log out'}</span>
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}