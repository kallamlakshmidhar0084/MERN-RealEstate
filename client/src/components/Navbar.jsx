import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/navbar.css"

function Navbar() {
  return (
    <header className=' bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3 px-6'>
        <Link to={'/'}>
        <h1  className='font-bold text-sm sm:text-xl flex flex-wrap' >
            <span className='text-slate-500'>Shanti</span>
            <span className='text-slate-700'>Estate</span>
        </h1>
        </Link>

        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type='text' placeholder='Search ....' className=' bg-transparent focus:outline-none w-20 sm:w-64'/>
            <FaSearch className='text-slate-600 m-1' />
        </form>
        <ul className='flex gap-4'>
          <Link to={'/'}>
          <li className='hidden sm:inline text-slate-700 hover:underline ' >Home</li>
          </Link>

          <Link to={'/about'}>
          <li className='hidden sm:inline text-slate-700 hover:underline '>About</li>
          </Link>

          <Link to={'/sign-in'}>
          <li className='text-slate-700 hover:underline '>Sign In</li>
          </Link>

        </ul>
        </div>
        

    </header>
  )
}

export default Navbar