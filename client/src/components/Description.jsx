import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { useAppContext } from '../context/AppContext'

const Description = () => {

  const {navigate} = useAppContext()
  return (
    <motion.section initial={{opacity: 0.2, y: 100}} transition={{duration: 1}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: 0.5}} className='flex flex-col items-center justify-center py-16 px-4 bg-gray-50 min-h-screen'>
        <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 text-center leading-tight"
      >
        Modify Image
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl text-center"
      >
        Transform your visuals with ease – from subtle tweaks to dramatic changes.
      </motion.p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full max-w-5xl">
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex-shrink-0 w-full md:w-1/3 lg:w-2/5 aspect-w-16 aspect-h-9 rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          {assets.sample_img_1 ? (
            <img
              src={assets.sample_img_1}
              alt="Sample Image 1"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
              Placeholder for Image 1
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          viewport={{ once: true }}
          className="flex-shrink-0 text-gray-700 text-6xl md:text-8xl transform rotate-90 md:rotate-0"
        >
          →
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex-shrink-0 w-full md:w-1/3 lg:w-2/5 aspect-w-16 aspect-h-9 rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          {assets.sample_img_2 ? (
            <img
              src={assets.sample_img_2}
              alt="Sample Image 2"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
              Placeholder for Image 2
            </div>
          )}
        </motion.div>
      </div>

      <motion.button
      onClick={() => navigate('/modify')}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        viewport={{ once: true }}
        className="mt-16 px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 active:bg-blue-800 cursor-pointer"
      >
        Start Modifying Now!
      </motion.button>
    </motion.section>
  )
}

export default Description