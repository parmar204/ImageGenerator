import React from 'react'
import { assets, testimonialsData } from "../assets/assets";

const Testimonial = () => {
  return (
    <section className='flex flex-col items-center justify-center my-20 p-12'>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Customer Testimonial</h1>
        <p className='text-gray-500 mb-12'>What are users are saying</p>

        <div className='flex flex-wrap gap-6'>
            {testimonialsData.map((testimonial, index) => (
                <div key={index} className='bg-white/20 p-12 rounded-lg transition-all shadow-md order w-80 m-auto cursor-pointer hover:scale-[1.02]'>
                    <div className='flex flex-col items-center'>
                        <img src={testimonial.image} className='rounded-full w-14' alt="" />
                        <h2 className='text-xl font-semibold mt-3'>{testimonial.name}</h2>
                        <p className='text-gray-500 mb-4'>{testimonial.role}</p>
                        <div className='flex mb-4'>
                            {Array(testimonial.stars).fill('').map((item, index) => (
                                <img src={assets.rating_star} key={index} alt="" />
                            ))}
                        </div>
                        <p className='text-sm text-center text-gray-600'>{testimonial.text}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}

export default Testimonial