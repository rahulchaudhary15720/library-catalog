import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Track scroll position to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-gradient-to-r from-blue-600 to-indigo-800'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className={`font-bold text-xl transition-colors duration-300 ${
              isScrolled ? 'text-blue-700' : 'text-white'
            }`}>
              BookLibrary
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-md font-medium transition-all duration-200 ${
                  isActive('/') 
                    ? (isScrolled ? 'text-blue-700 bg-blue-50' : 'text-white bg-blue-700 bg-opacity-30') 
                    : (isScrolled ? 'text-gray-700 hover:text-blue-700 hover:bg-blue-50' : 'text-blue-100 hover:text-white hover:bg-blue-700 hover:bg-opacity-30')
                }`}
              >
                Home
              </Link>
              <Link 
                to="/borrow-history" 
                className={`px-3 py-2 rounded-md text-md font-medium transition-all duration-200 ${
                  isActive('/borrow-history') 
                    ? (isScrolled ? 'text-blue-700 bg-blue-50' : 'text-white bg-blue-700 bg-opacity-30') 
                    : (isScrolled ? 'text-gray-700 hover:text-blue-700 hover:bg-blue-50' : 'text-blue-100 hover:text-white hover:bg-blue-700 hover:bg-opacity-30')
                }`}
              >
                Borrow History
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled ? 'text-gray-700 hover:text-blue-700 hover:bg-blue-50' : 'text-white hover:text-white hover:bg-blue-700 hover:bg-opacity-30'
              }`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className={`px-2 pt-2 pb-3 space-y-1 ${isScrolled ? 'bg-white' : 'bg-gradient-to-r from-blue-600 to-indigo-800'}`}>
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') 
                ? (isScrolled ? 'text-blue-700 bg-blue-50' : 'text-white bg-blue-700 bg-opacity-30') 
                : (isScrolled ? 'text-gray-700 hover:text-blue-700 hover:bg-blue-50' : 'text-blue-100 hover:text-white hover:bg-blue-700 hover:bg-opacity-30')
            }`}
          >
            Home
          </Link>
          <Link
            to="/borrow-history"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/borrow-history') 
                ? (isScrolled ? 'text-blue-700 bg-blue-50' : 'text-white bg-blue-700 bg-opacity-30') 
                : (isScrolled ? 'text-gray-700 hover:text-blue-700 hover:bg-blue-50' : 'text-blue-100 hover:text-white hover:bg-blue-700 hover:bg-opacity-30')
            }`}
          >
            Borrow History
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;