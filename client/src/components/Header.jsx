import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion"
import { useAppContext } from '../context/AppContext'

const Header = () => {
    const {user, setShowLogin, navigate} = useAppContext()
  return (
    <motion.section className='flex flex-col justify-center items-center text-center my-20' initial={{opacity: 0.2, y:100}} transition={{duration: 1}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}>
        <motion.div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500' initial={{opacity: 0.2, y:100}} transition={{duration: 0.8, delay: 0.2}} animate={{opacity: 1, y: -20}} viewport={{once: true}}>
            <p>Best text to image generator</p>
            <img src={assets.star_icon} alt="" />
        </motion.div>
        <motion.h1 initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.4, delay: 0.6}} className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>
            Turn text to <span className='text-blue-600'>image</span>, in seconds
        </motion.h1>
        <motion.p initial={{opacity: 0, y: 20}} animate={{opacity: 1, y:0}} transition={{duration: 0.8, delay: 0.6}} className='text-center max-w-xl mx-auto mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore mollitia quidem magni possimus velit corporis corrupti officiis obcaecati repellendus saepe?</motion.p>
        <motion.button onClick={() => user ? navigate('/result') : setShowLogin(true)} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} initial={{opacity: 0}} animate={{opacity: 1}} transition={{default: {duration: 0.5}, opacity: {delay: 0.8, duration: 1}}} className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full cursor-pointer'>
            Generate Images <img src={assets.star_group} alt="" className='h-6' />
        </motion.button>

        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 1, duration: 1}} className='flex flex-wrap justify-center mt-16 gap-3'>
            {Array(6).fill('').map((item, index) => (
                <motion.img whileHover={{scale: 1.05, duration: 0.1}} className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src={index % 2 ? assets.sample_img_1 : assets.sample_img_2} alt='' key={index} width={70} />
            ))}
        </motion.div>
        <motion.p initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 1.2, duration: 0.8}} className='mt-2 text-neutral-600'>Generate images</motion.p>
    </motion.section>
  )
}

export default Header