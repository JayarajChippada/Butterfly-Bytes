import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <ul className='font-medium flex flex-col justify-between w-[90%] mx-auto mt-1 mb-2'>
      <NavLink 
        to='/' 
        className={({ isActive }) => 
          `py-2 pl-2 border-b ${isActive ? 'bg-blue-400' : 'hover:bg-slate-50'}`
        }
      > 
        Home
      </NavLink>
      <NavLink 
        to='/about' 
        className={({ isActive }) => 
          `py-2 pl-2 border-b ${isActive ? 'bg-blue-400' : 'hover:bg-slate-50'}`
        }
      > 
        About
      </NavLink>
      <NavLink 
        to='/projects' 
        className={({ isActive }) => 
          `py-2 pl-2 border-b ${isActive ? 'bg-blue-400' : 'hover:bg-slate-50'}`
        }
      > 
        Projects
      </NavLink>
    </ul>
  )
}

export default Navbar
