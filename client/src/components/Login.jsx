import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'

const Login = () => {

    const [state, setstate] = useState('Login')
    const {setShowLogin, setToken, setUser} = useAppContext()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (state === "Login") {
                const { data } = await axios.post('/api/user/login', {
                    email, password
                })
                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post('/api/user/register', {
                    name, email, password
                })
                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else {
                    console.log(error)
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => document.body.style.overflow = 'unset'
    }, [])

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
        <motion.form onSubmit={handleSubmit} initial={{opacity: 0.2, y: 50}} transition={{duration: 0.3}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
            <p className='text-sm text-center'>Welcome {state=="Login" && "back"}!</p>
            {state !== 'Login' && (
                <div className='px-4 py-2 flex items-center gap-2 shadow-md rounded-full mt-5'>
                    <img src={assets.profile_icon} alt="" width={20} />
                    <input onChange={e => setName(e.target.value)} value={name} type="text" className='outline-none text-sm' placeholder='Full Name' required />
                </div>
            )}

             <div className='shadow-md px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.email_icon} alt="" />
                <input onChange={e => setEmail(e.target.value)} value={email} type="email" className='outline-none text-sm' placeholder='Email Id' required />
            </div>

             <div className='shadow-md px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.lock_icon} alt="" />
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" className='outline-none text-sm' placeholder='Password' required />
            </div>

            <p className='text-sm text-blue-600 my-4 cursor-pointer'>forget password?</p>

            <button
                className='w-full bg-blue-600 text-white py-2 rounded-full flex items-center justify-center gap-2 disabled:opacity-60'
                disabled={loading}
            >
                {loading ? (
                    <>
                    <span className="loader"></span>
                    Processing...
                    </>
                ) : (
                    state === "Login" ? "Login" : "Create Account"
            )}
            </button>


            {state === "Login" ? 
            (<p onClick={() => setstate("Sign Up")} className='mt-4 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer'>Sign Up</span></p>) : 
            (<p onClick={() => setstate("Login")} className='mt-4 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer'>Sign Up</span></p>)}

            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} className=' absolute top-5 right-5 cursor-pointer' alt="" />
        </motion.form>
    </div>
  )
}

export default Login