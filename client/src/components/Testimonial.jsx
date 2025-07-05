import React from 'react';
import { assets, testimonialsData } from "../assets/assets";
import { motion } from 'framer-motion';

// --- Variants for container and individual items ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren", // Animate container before children
      staggerChildren: 0.15 // Stagger each testimonial card's animation
    }
  }
};

const cardVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring", // Use a spring for a more natural bounce
      stiffness: 100,
      damping: 15
    }
  }
};

const Testimonial = () => {
  return (
    <motion.section
      initial="hidden" // Set initial state to 'hidden'
      whileInView="visible" // Animate to 'visible' when in view
      viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of the section is in view
      className='flex flex-col items-center justify-center my-16 py-12 px-4 bg-gradient-to-b from-gray-50 to-white' // Added more styling for the section background
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className='text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2 text-center leading-tight'
      >
        Customer Testimonials
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className='text-lg md:text-xl text-gray-600 mb-12 text-center max-w-xl'
      >
        Hear what our amazing users are saying about their experience.
      </motion.p>

      {/* Testimonials Grid */}
      <motion.div
        variants={containerVariants} // Apply container variants here
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full max-w-6xl px-4 sm:px-0' // Changed to grid for better control
      >
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={cardVariants} // Apply card variants here
            // Existing Tailwind styles for the card
            className='bg-white p-8 sm:p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer transform hover:-translate-y-2' // Enhanced card styling
          >
            <div className='flex flex-col items-center text-center'> {/* Centered content within card */}
              <img
                src={testimonial.image}
                className='rounded-full w-20 h-20 object-cover border-4 border-blue-200 mb-4' // Larger, styled image
                alt={testimonial.name}
              />
              <h2 className='text-2xl font-bold text-gray-800'>{testimonial.name}</h2>
              <p className='text-md text-blue-600 mb-3'>{testimonial.role}</p>
              <div className='flex mb-4 gap-0.5'> {/* Added small gap between stars */}
                {Array(testimonial.stars).fill('').map((_, starIndex) => (
                  <img
                    src={assets.rating_star}
                    key={starIndex}
                    alt="Rating star"
                    className='w-5 h-5' // Consistent star size
                  />
                ))}
              </div>
              <p className='text-base text-gray-700 leading-relaxed'>" {testimonial.text} "</p> {/* Added quotes */}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Testimonial;