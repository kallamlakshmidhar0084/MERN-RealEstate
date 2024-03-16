import React from 'react'
import { FaSearch } from 'react-icons/fa';
import {  useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/navbar.css"

function Navbar() {
  const user=useSelector(state=> state.user);
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
        <ul className='flex gap-4 items-center'>
          <Link to={'/'}>
          <li className='hidden sm:inline text-slate-700 hover:underline ' >Home</li>
          </Link>

          <Link to={'/about'}>
          <li className='hidden sm:inline text-slate-700 hover:underline '>About</li>
          </Link>

          <Link to={'/profile'} >
            {user.currentUser ? ( <img className='rounded-full w-10  mx-2'  src={user.currentUser.data.avatar} alt="Profile" />) : (
              <li className='text-slate-700 hover:underline '>Sign In</li>
              )
            }
          
          </Link>

        </ul>
        </div>
        

    </header>
  )
}

export default Navbar