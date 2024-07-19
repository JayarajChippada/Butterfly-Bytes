import React, { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/butterfly-logo.png';
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signOutSuccess } from '../redux/user/userSlice';

import Navbar from './Navbar';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { theme }  = useSelector((state)=>state.theme);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfile = () => {
    setIsClicked(!isClicked);
  }

  const toggleThemeButton = () => {
    dispatch(toggleTheme())
  }

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

  const handleSignOut = async(e) => {
      try{
        const res = await fetch('/api/user/sign-out', {
          method: 'POST',
        });
        const data = await res.json();
        if(!res.ok) {
          console.log(data.message);
        }
        else {
          dispatch(signOutSuccess());
        }
      } catch(error) {
        console.log(error.message);
      }
    }

  return (
    <header className='bg-white flex flex-col w-full border-b-2 dark:border-gray-700 dark:bg-gray-800'>
      <nav className='flex flex-wrap items-center justify-between w-[92%] mx-auto py-2'>
        {/* Logo Div */}
        <div className='flex items-center justify-center'>
          <Link to="/">
            <img src={logo} alt="Logo" className='w-10 h-10 sm:w-12 sm:h-12'/>
          </Link>
      
          <Link to='/' className='flex flex-col font-bold text-xs sm:flex-row sm:items-center sm:text-lg dark:text-white'>
            <span className='px-2 py-1 rounded-md text-xs font-bold bg-clip-text text-white bg-custom-gradient sm:text-lg'>
              Jayaraj's 
            </span>
            |Blog
          </Link>
        </div>

        <div className='flex items-center'>
          {/* Search Button */}
          <button 
            type="button" 
            className="flex items-center justify-center p-0.5 text-center font-medium relative 
                        focus:z-10 focus:outline-none text-gray-900 bg-white border border-gray-200 
                        hover:bg-slate-100  enabled:hover:bg-gray-100 enabled:hover:text-cyan-700 
                        :ring-cyan-700 focus:text-cyan-700 dark:bg-transparent dark:text-gray-400 
                        dark:border-gray-600 dark:enabled:hover:text-white dark:enabled:hover:bg-gray-700 
                        rounded-full focus:ring-2 lg:hidden w-12 h-10 ">
            <span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">
             <AiOutlineSearch className='w-4 h-4'/>
            </span>
          </button>

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
                  className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 
                  bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500  
                  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
                  p-2.5 text-sm pr-10 rounded-lg'
                />
              </div>
            </div>
          </form>
          
          {/* Nav Links */}
          <div className="hidden md:flex mx-10">
            <ul className='font-medium flex justify-between items-center space-x-8  bg-transparent '>
                <NavLink 
                  to='/' 
                  className={({ isActive }) => 
                    `text-sm ${isActive ? 'text-cyan-700 font-bold' : 'hover:text-cyan-700'}`
                  }> 
                  Home
                </NavLink>
                <NavLink 
                  to='/about' 
                  className={({ isActive }) => 
                    `text-sm ${isActive ? 'text-cyan-700 font-bold' : 'hover:text-cyan-700'}`
                  }> 
                  About
                </NavLink>
                <NavLink 
                  to='/projects' 
                  className={({ isActive }) => 
                    `text-sm ${isActive ? 'text-cyan-700 font-bold' : 'hover:text-cyan-700'}`
                  }> 
                  Projects
                </NavLink>
            </ul>
          </div>

          {/* Theme Button */}
          <div className='hidden sm:block ml-5 md:ml-0'>
            <button 
              type="button" 
              onClick={toggleThemeButton}
              className="flex items-center justify-center p-0.5 text-center font-medium relative 
                        focus:z-10 focus:outline-none text-gray-900 bg-white border border-gray-200 
                        hover:bg-slate-100  enabled:hover:bg-gray-100 enabled:hover:text-cyan-700 
                        :ring-cyan-700 focus:text-cyan-700 dark:bg-transparent dark:text-gray-400 
                        dark:border-gray-600 dark:enabled:hover:text-white dark:enabled:hover:bg-gray-700 
                        rounded-full focus:ring-2 w-12 h-10">
              <span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">
                { theme === 'light' ? <FaMoon /> : <FaSun />}
              </span>
            </button>
          </div>
          
          {/* Sign In button & User Profile */}
          { currentUser 
                ? (
                  <div className='relative'>
                    <button
                    type='button'
                    onClick={toggleProfile}
                    className={`ml-2 mr-2 flex text-sm bg-transparent rounded-full md:me-0 focus:ring-gray-300 dark:focus:ring-gray-600`}
                  >
                    <span className='sr-only'>Open user menu</span>
                    <img src={currentUser.profilePicture} className='w-8 h-8 rounded-full object-cover'/>
                  </button>
                  {isClicked && (
                    <div className='absolute  top-11 right-0 flex flex-col justify-center text-sm bg-white z-10 divide-y divide-gray-100 dark:divide-gray-500  rounded-md border shadow dark:text-gray-200 dark:bg-gray-700 dark:border-none'>
                      <div className="py-1">
                        <div className="block px-4 py-2 text-gray-700 font-md dark:text-white truncate">
                          <div>{currentUser.userName}</div>
                          <div>{currentUser.email}</div>
                        </div>
                      </div>
                      <div className="py-1">
                        <Link to={'/dashboard?tab=profile'} onClick={toggleProfile} className='block px-4 py-2 text-gray-700 font-md dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-200'>Profile</Link>
                      </div>
                      <div className="py-1">
                        <span onClick={handleSignOut} className='block cursor-pointer px-4 py-2 text-gray-700 font-md dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-200'>SignOut</span>
                      </div>
                    </div>
                  )}
                  </div>
                ) 
                : (
                  <Link to='/sign-in'>
                    <button className="relative ml-2 mr-2 bg-custom-gradient-oauth inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group hover:text-white dark:text-white ">
                      <span className="relative m-0.5 font-normal px-4 py-2 transition-all ease-in duration-75 bg-white text-black hover:text-white rounded-md group-hover:bg-opacity-0 dark:bg-custom-dark dark:text-white">
                        Sign In
                      </span>
                    </button>
                  </Link>
                )
          }

          {/* Toggle Menu */}
          <div className={`md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2
                         focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 
                         ${isOpen ? 'border border-slate-400' : 'hover:bg-gray-100'} focus:outline-none`}>
            {isOpen ? (
              <IoMdClose fontSize={24} className='cursor-pointer' onClick={toggleMenu} />
            ) : (
              <AiOutlineMenu  className='cursor-pointer h-6 w-6' onClick={toggleMenu} />
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
