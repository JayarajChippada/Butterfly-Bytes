import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <ul className='font-medium flex flex-col justify-between w-[90%] mx-auto mt-1 mb-2'>
      <NavLink 
        to='/' 
        className={({ isActive }) => 
          `py-2 pl-2 border-b  ${isActive ? 'bg-cyan-700 text-white border-b-0 dark:text-white' : 'hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`
        }
      > 
        Home
      </NavLink>
      <NavLink 
        to='/about' 
        className={({ isActive }) => 
          `py-2 pl-2 border-b  ${isActive ? 'bg-cyan-700 text-white border-b-0 dark:text-white' : 'hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`
        }
      > 
        About
      </NavLink>
      <NavLink 
        to='/projects' 
        className={({ isActive }) => 
          `py-2 pl-2 border-b  ${isActive ? 'bg-cyan-700 text-white border-b-0 dark:text-white' : 'hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`
        }
      > 
        Projects
      </NavLink>
    </ul>
  )
}

export default Navbar
