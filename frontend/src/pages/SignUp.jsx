import React from 'react';
import logo from '../assets/butterfly-logo.avif';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          {/* Logo Div */}
          <div className='flex flex-col'>
            <div className='flex items-center justify-start'>
              <Link to='/' className='flex items-center font-bold text-3xl'>
                <span className='px-2 py-1 rounded-md text-3xl font-bold bg-clip-text text-white bg-custom-gradient'>
                  Jayaraj's 
                </span>
                |Blog
              </Link>

              <Link to="/">
                <img src={logo} alt="Logo" className='w-16 h-16'/>
              </Link>
            </div>

            <p className="text-md text-gray-700 md:hidden">Transform your ideas into beautiful blogs. Sign up now and start your journey!</p>

            <div className='hidden md:flex flex-col text-gray-700'>
              <p className="text-md">Transform your ideas into beautiful blogs.</p>
              <p className="text-md">Sign up now and start your journey!</p>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className='flex flex-col gap-4'>
            <div>
              <h3 className="font-semibold mb-2">Your username</h3>
              <input 
                type="text" 
                placeholder='Username'
                className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg'
              />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Your email</h3>
              <input 
                type="text" 
                placeholder='name@company.com'
                className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg'
              />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Your password</h3>
              <input 
                type="text" 
                placeholder='Password'
                className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg'
              />
            </div>

            <button className="relative ml-2 mr-2 bg-custom-gradient-button inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group hover:text-white dark:text-white ">
              <span className="relative m-0.5 font-normal px-4 py-2 transition-all ease-in duration-75 bg-transparent text-white hover:text-white rounded-md group-hover:bg-opacity-0">
                Sign In
              </span>
            </button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
