import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { useAppContext } from '../context/AppContext'

const GenerateBtn = () => {
  const {user, navigate, setShowLogin} = useAppContext()
  return (
    <motion.section initial={{opacity: 0.2, y: 100}} transition={{duration: 1}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className='pb-16 text-center'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>See the Magic. Try Now</h2>
        <button onClick={() => user ? navigate('/result') : setShowLogin(true)} className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500 cursor-pointer'>Generate Images <img src={assets.star_group} className='h-6' alt="" /></button>
    </motion.section>
  )
}

export default GenerateBtn