import React from 'react';
import { useSelector } from 'react-redux';

const DashProfile = () => {
    const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='max-w-lg mx-auto p-3 w-full '>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form action="" className="flex flex-col  gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
            <img 
                src={currentUser.profilePicture} 
                alt="user" 
                className='rounded-full w-full h-full object-cover border-8 border-[light-gray]'
            />
        </div>

        <div className='relative w-full'>
            <input 
                type="text" 
                placeholder='Username'
                id='userName'
                defaultValue={currentUser.userName}
                className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 
                    focus:border-cyan-500 focus:ring-cyan-500 
                    dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 
                    p-2.5 text-sm rounded-lg'
            />
        </div>

        <div className='relative w-full'>
            <input 
                type="text" 
                placeholder='email'
                id='email'
                defaultValue={currentUser.email}
                className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 
                    focus:border-cyan-500 focus:ring-cyan-500 
                    dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 
                    p-2.5 text-sm rounded-lg'
            />
        </div>

        <div className='relative w-full'>
            <input 
                type="text" 
                placeholder='Password'
                id='password'
                className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 
                    focus:border-cyan-500 focus:ring-cyan-500 
                    dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 
                    p-2.5 text-sm rounded-lg'
            />
        </div>

        <button 
          type='button'
          className="relative bg-custom-gradient-oauth flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group hover:text-white dark:text-white ">
          <span className="relative  w-full font-normal px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-custom-dark dark:text-white text-black hover:text-white rounded-md group-hover:bg-opacity-0">
            <div className="flex items-center justify-center">
              Update
            </div>
          </span>
        </button>
      </form>
      <div className= "text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}

export default DashProfile
