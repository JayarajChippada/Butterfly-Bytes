import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../assets/home-page-banner.jpg';
import logo from '../assets/butterfly-logo.png';
import userbanner from '../assets/user-banner.png';

const Home = () => {
  return (
    <div className='min-h-screen bg-white dark:bg-custom-dark'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col lg:flex-row'>
          {/* left */}
          <div className='flex-1 w-full'>
            <Link to='/'>
              <img 
                src={Banner}
                className='h-32 w-full object-cover'
                alt="banner" />
            </Link>
            <div className="mx-3">
              <div className="max-w-3xl mx-auto">
                <div className="py-4 md:py-12">
                   <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                          <img 
                            src={userbanner}
                            className='h-32 w-32 object-cover bg-transparent'
                            alt="logo" />
                            <p className='ml-5 text-md font-semibold'>300 Followers</p>
                        </div>
                        <button className='rounded-2xl bg-blue-500 text-white px-5 py-2'>
                          Follow
                        </button>
                    </div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          <div className='w-[352px]'>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
