import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {

    const {user, navigate, setShowLogin, logout, credit} = useAppContext()

  return (
    <nav className='flex items-center justify-between py-4'>
        <Link to={'/'}><img src={assets.logo} alt="logo" className='w-28 sm:w-32 lg:w-40' /></Link>
        <div>
            {
                user ? 
                <div className='flex items-center gap-2 sm:gap-3'>
                    <button onClick={() => navigate('/buy-credit')} className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'><img src={assets.credit_star} alt="" className='w-5' /><p className='text-sm sm:text-sm font-medium text-gray-600'>Credit left : {credit}</p></button>
                    <p className='text-gray-600 max-sm:hidden pl-4'>Hi, {user.name}</p>
                    <div className='relative group'>
                        <img src={assets.profile_icon} alt="" className='w-10 drop-shadow' />
                        <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black pt-12'>
                            <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                                <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                            </ul>
                        </div>
                    </div>
                </div> 
                :
                <div className='flex items-center gap-2 sm:gap-5'>
                    <p onClick={() => navigate('/buy-credit')} className='cursor-pointer'>Pricing</p>
                    <button onClick={() => setShowLogin(true)} className='bg-zinc-800 cursor-pointer text-white px-2 py-2 sm:px-10 text-sm rounded-full'>Login</button>
                </div>
            }
        </div>
    </nav>
  )
}

export default Navbar