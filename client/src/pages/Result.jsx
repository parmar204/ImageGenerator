import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Result = () => {

  const [image, setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setinput] = useState('')

  const { generateImage } = useAppContext()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (!input.trim()) {
      toast.error("Please enter a prompt")
      setLoading(false)
      return
    } else {
      const imageUrl = await generateImage(input)
      if (imageUrl) {
        setIsImageLoaded(true)
        setImage(imageUrl)
      }
    }
    setLoading(false)
  }

  return (
    <motion.form initial={{opacity: 0.2, y: 100}} transition={{duration: 1}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] items-center justify-center'>
      <div>
        <div className='relative'>
          <img src={image} alt="" className='max-w-sm rounded' />
          <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full  transition-all duration-[10s]' : 'w-0'}`}></span>
        </div>
        {loading && <p>Loading.....</p>}
      </div>
      {!isImageLoaded ? (
        <div className='flex w-full max-w-xl text-white bg-neutral-500 text-sm rounded-full p-0.5  mt-10'>
          <input onChange={e => setinput(e.target.value)} value={input} type="text" placeholder='Describe what you want to generate' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder:text-[#e0e0e0] placeholder:font-[300]' />
          <button className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full cursor-pointer'>Generate</button>
        </div>
      ):(
        <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
          <p onClick={() => setIsImageLoaded(false)} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
          <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
        </div>
      )}
    </motion.form>
  )
}

export default Result