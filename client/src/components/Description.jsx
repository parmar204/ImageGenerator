import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Description = () => {
  return (
    <motion.section initial={{opacity: 0.2, y: 100}} transition={{duration: 1}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create Ai Image</h1>
        <p className='text-gray-500 mb-8'>Turn your Imagination into visuals</p>

        <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
            <img className='w-80 xl:w-96 rounded-lg' src={assets.sample_img_1} alt="" />
            <div className=''>
                <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing AI-Powered Text to Image Generator</h2>
                <p className='text-gray-600 mb-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores exercitationem perferendis et aliquam, deserunt culpa eligendi aut accusantium quae facilis harum, dicta eaque veniam esse quo necessitatibus delectus sed in magnam. Dolor tempora tenetur perspiciatis quisquam, soluta vero repellendus voluptates temporibus.</p>
                <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab obcaecati harum expedita quo ut voluptatem saepe distinctio fugiat porro consequatur! Quae, sequi placeat quasi nobis autem velit, quos nisi alias, tenetur delectus fugiat repudiandae iusto ad animi. Dolorem, quas explicabo?</p>
            </div>
        </div>
    </motion.section>
  )
}

export default Description