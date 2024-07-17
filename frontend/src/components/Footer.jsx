import React from 'react';
import logo from '../assets/butterfly-logo.png';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='bg-white custom-gradient-border shadow rounded-lg dark:bg-gray-800'>
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className='sm:flex sm:justify-between sm:items-start'>
          {/* Logo Div */}
          <div className='flex items-center justify-start mb-5'>
            <Link to='/' className='flex items-center font-bold text-xl sm:flex-col sm:items-start md:flex-row'>
              <span className='px-2 py-1 rounded-md text-xl font-bold bg-clip-text text-white bg-custom-gradient'>
                Jayaraj's 
              </span>
              <span className="flex">
                |Blog
                <Link to="/" className='hidden sm:block md:hidden'>
                  <img src={logo} alt="Logo" className='w-8 h-8'/>
                </Link>
              </span>
            </Link>
            <Link to="/" className='sm:hidden md:block'>
              <img src={logo} alt="Logo" className='w-12 h-12'/>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                About
              </h2>
              <ul className='text-gray-500 font-medium dark:text-white'>
                <li className='mb-4'>
                  <a href="#" className='hover:underline'>Jayaraj's Blog</a>
                </li>
                <li>
                  <a href="#" className='hover:underline'>Jayaraj's Projects</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow Us
              </h2>
              <ul className='text-gray-500 font-medium dark:text-white'>
                <li className='mb-4'>
                  <a href="#" className='hover:underline'>Github</a>
                </li>
                <li>
                  <a href="#" className='hover:underline'>Discord</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className='text-gray-500 font-medium dark:text-white'>
                <li className='mb-4'>
                  <a href="#" className='hover:underline'>Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className='hover:underline'>Terms & Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg-my-8" />
        <div className="sm:flex sm:justify-between">
          <span className='text-sm text-gray-500 sm:text-center'>
            @ 2024
            <Link to='/' className='hover:underline'> Jayaraj's Blog</Link>
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 text-gray-500">
            <a href="#" className="mx-2"><FaFacebook /></a>
            <a href="#" className="mx-2"><FaInstagram /></a>
            <a href="#" className="mx-2"><FaTwitter /></a>
            <a href="#" className="mx-2"><FaGithub /></a>
            <a href="#" className="mx-2"><FaDiscord /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
