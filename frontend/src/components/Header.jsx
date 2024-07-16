import React, { useState, useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/butterfly-logo.avif';
import { IoMdClose } from "react-icons/io";

import Navbar from './Navbar';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className='bg-white flex flex-col w-full border-b-2'>
      <nav className='flex flex-wrap items-center justify-between w-[92%] mx-auto py-2'>
        {/* Logo Div */}
        <div className='flex items-center justify-center'>
          <Link to="/">
            <img src={logo} alt="Logo" className='w-10 h-10 sm:w-12 sm:h-12'/>
          </Link>
      
          <Link to='/' className='flex flex-col font-bold text-xs sm:flex-row sm:items-center sm:text-lg'>
            <span className='px-2 py-1 rounded-md text-xs font-bold bg-clip-text text-white bg-custom-gradient sm:text-lg'>
              Jayaraj's 
            </span>
            |Blog
          </Link>
        </div>

        <div className='flex items-center'>
          {/* Search Button */}
          <div className='lg:hidden'>
            <button 
              type="button" 
              className="flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-gray-900 bg-white border border-gray-200 hover:bg-slate-100 group rounded-full lg:hidden w-12 h-10">
              <span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">
                <svg 
                  stroke="currentColor" 
                  fill="currentColor" 
                  strokeWidth="0" 
                  viewBox="0 0 1024 1024" 
                  height="1em" width="1em" 
                  xmlns="http://www.w3.org/2000/svg">
                    <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z">
                    </path>
                </svg>
              </span>
            </button>
          </div>

          <div className=""></div>
    
          {/* Search Field */}
          <form action="">
            <div className="hidden lg:inline">
              <div className="relative w-full">
                <div className="absolute right-0 flex items-center pt-3 pr-3 text-gray-500 cursor-pointer">
                  <AiOutlineSearch height={5} width={5} />
                </div>
                <input 
                  type="text"
                  placeholder='Search...' 
                  className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500  p-2.5 text-sm pr-10 rounded-lg'
                />
              </div>
            </div>
          </form>
          
          {/* Nav Links */}
          <div className="hidden md:flex mx-10">
            <ul className='font-medium flex justify-between items-center space-x-8'>
                <NavLink 
                  to='/' 
                  className={({ isActive }) => 
                    `text-sm ${isActive ? 'text-blue-400 font-bold' : 'hover:text-blue-400'}`
                  }> 
                  Home
                </NavLink>
                <NavLink 
                  to='/about' 
                  className={({ isActive }) => 
                    `text-sm ${isActive ? 'text-blue-400 font-bold' : 'hover:text-blue-400'}`
                  }> 
                  About
                </NavLink>
                <NavLink 
                  to='/projects' 
                  className={({ isActive }) => 
                    `text-sm ${isActive ? 'text-blue-400 font-bold' : 'hover:text-blue-400'}`
                  }> 
                  Projects
                </NavLink>
            </ul>
          </div>
          {/* Theme Button */}
          <div className='hidden sm:block ml-5 md:ml-0'>
            <button 
              type="button" 
              className="flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-gray-900 bg-white border border-gray-200 hover:bg-slate-100 group rounded-full w-12 h-10">
              <span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">
                <svg 
                  stroke="currentColor" 
                  fill="currentColor" 
                  strokeWidth="0" 
                  viewBox="0 0 512 512" 
                  height="1em" 
                  width="1em" 
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z">
                  </path>
                </svg>
              </span>
            </button>
          </div>

          {/* Sign In button */}
          <Link to='/sign-in'>
            <button className="relative ml-2 mr-2 bg-custom-gradient-button inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group hover:text-white dark:text-white ">
              <span className="relative m-0.5 font-normal px-4 py-2 transition-all ease-in duration-75 bg-white text-black hover:text-white rounded-md group-hover:bg-opacity-0">
                Sign In
              </span>
            </button>
          </Link>

          {/* Toggle Menu */}
          <div className={`md:hidden p-2 rounded-md ${isOpen ? 'bg-slate-200 border border-slate-400' : 'hover:bg-slate-200'} focus:outline-none`}>
            {isOpen ? (
              <IoMdClose fontSize={24} className='cursor-pointer' onClick={toggleMenu} />
            ) : (
              <AiOutlineMenu fontSize={24} className='cursor-pointer' onClick={toggleMenu} />
            )}
          </div>
        </div>
      </nav>

      {isOpen && (
        <Navbar />
      )}
    </header>
  );
}

export default Header;
