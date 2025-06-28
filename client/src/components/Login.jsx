import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Login = () => {

    const [state, setstate] = useState('Login')
    const {setShowLogin} = useAppContext()

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => document.body.style.overflow = 'unset'
    }, [])

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
        <form className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
            <p className='text-sm text-center'>Welcome {state=="Login" && "back"}!</p>
            {state !== 'Login' && (
                <div className='px-4 py-2 flex items-center gap-2 shadow-md rounded-full mt-5'>
                    <img src={assets.profile_icon} alt="" width={20} />
                    <input type="text" className='outline-none text-sm' placeholder='Full Name' required />
                </div>
            )}

             <div className='shadow-md px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.email_icon} alt="" />
                <input type="email" className='outline-none text-sm' placeholder='Email Id' required />
            </div>

             <div className='shadow-md px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.lock_icon} alt="" />
                <input type="password" className='outline-none text-sm' placeholder='Password' required />
            </div>

            <p className='text-sm text-blue-600 my-4 cursor-pointer'>forget password?</p>

            <button className='w-full bg-blue-600 text-white py-2 rounded-full'>{state === "Login" ? "Login" : "Create Account"}</button>

            {state === "Login" ? 
            (<p onClick={() => setstate("Sign Up")} className='mt-4 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer'>Sign Up</span></p>) : 
            (<p onClick={() => setstate("Login")} className='mt-4 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer'>Sign Up</span></p>)}

            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} className=' absolute top-5 right-5 cursor-pointer' alt="" />
        </form>
    </div>
  )
}

export default Login