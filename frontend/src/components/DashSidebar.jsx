import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdPerson } from "react-icons/io";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { signOutSuccess } from '../redux/user/userSlice';

const DashSidebar = ({ tab }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state)=>state.user);
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
    <div className='h-full w-full md:w-56'>
      <div className='h-full overflow-y-auto overflow-x-hidden rounded bg-gray-50 py-4 px-3 dark:bg-gray-800'>
        <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700">
          <li>
              <div className={`flex items-center  justify-center rounded-lg p-2 text-base font-normal text-gray-900 
                          hover:bg-gray-100  dark:text-white dark:hover:bg-gray-700  ${ tab === 'profile' ? 'bg-gray-200 dark:bg-gray-700' : 'dark:bg-transparent'}`} >
                  <IoMdPerson className='h-6 w-6  flex-shrink-0 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white text-gray-700 dark:text-gray-100'/>
                  <span  className='px-3 flex-1 whitespace-nowrap'> 
                      <Link to='/dashboard?tab=profile' >Profile</Link>
                  </span>
                  <span className='flex  h-fit  items-center gap-1 font-semibold bg-gray-600 text-gray-100 
                          dark:bg-gray-900 dark:text-gray-200 group-hover:bg-gray-500 dark:group-hover:bg-gray-700 
                          p-1 text-xs rounded px-2 py-0.5'>
                              { currentUser.isAdmin ? 'Admin' : 'User'}
                  </span>
                              
              </div>
          </li>

          {
            currentUser.isAdmin && (
               <li>
                  <div className={`flex items-center  justify-center rounded-lg p-2 text-base font-normal text-gray-900 
                              hover:bg-gray-100  dark:text-white dark:hover:bg-gray-700 ${ tab === 'posts' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-transparent'}`} >
                      <HiDocumentText  className='h-5 w-6  flex-shrink-0 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white text-gray-700 dark:text-gray-100'/>
                      <span  className='px-3 flex-1 whitespace-nowrap'> 
                          <Link to='/dashboard?tab=posts' >Posts</Link>
                      </span>

                  </div>
              </li>
            )
          }

          {
            currentUser.isAdmin && (
               <li>
                  <div className={`flex items-center  justify-center rounded-lg p-2 text-base font-normal text-gray-900 
                              hover:bg-gray-100  dark:text-white dark:hover:bg-gray-700 ${ tab === 'users' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-transparent'}`} >
                      <HiOutlineUserGroup  className='h-5 w-6  flex-shrink-0 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white text-gray-700 dark:text-gray-100'/>
                      <span  className='px-3 flex-1 whitespace-nowrap'> 
                          <Link to='/dashboard?tab=users' >Users</Link>
                      </span>

                  </div>
              </li>
            )
          }

          <li>
              <div className={`flex items-center  justify-center rounded-lg p-2 text-base font-normal text-gray-900 
                          hover:bg-gray-100  dark:text-white dark:hover:bg-gray-700 ${ tab === 'sign-out' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-transparent'}`} >
                  <FaArrowRightFromBracket  className='h-5 w-6  flex-shrink-0 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white text-gray-700 dark:text-gray-100'/>
                  <span  className='px-3 flex-1 whitespace-nowrap'> 
                      <span onClick={handleSignOut} className='cursor-pointer' >Sign out</span>
                  </span>
                              
              </div>
          </li>

        </ul>
      </div>
    </div>
  )
}

export default DashSidebar
