import React from 'react';
import { stepsData } from '../assets/assets';
import { motion } from 'framer-motion';

// Define variants for the container to orchestrate animations
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren", // Animate container before its children
      staggerChildren: 0.2 // Stagger the animation of each child item
    }
  }
};

// Define variants for each individual step item
const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring", // Use a spring animation for a bouncier feel
      stiffness: 100, // Adjust stiffness for the spring effect
      damping: 10 // Adjust damping for the spring effect
    }
  }
};

const Steps = () => {
  return (
    <motion.section
      initial="hidden" // Set initial state to 'hidden'
      whileInView="visible" // Animate to 'visible' when in view
      viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of the section is in view
      className='flex flex-col items-center justify-center my-24 sm:my-32 px-4' // Added px-4 for mobile padding
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2 text-center'
      >
        How It Works
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className='text-lg md:text-xl text-gray-600 mb-12 text-center max-w-xl'
      >
        Seamlessly transform your ideas into stunning visuals in a few simple steps.
      </motion.p>

      {/* Steps Container */}
      <motion.div
        variants={containerVariants} // Apply container variants here
        className='space-y-6 w-full max-w-3xl' // Increased space-y for better separation
      >
        {
          stepsData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants} // Apply item variants here
              className='flex items-center gap-4 p-5 px-6 sm:px-8 bg-white rounded-lg shadow-xl cursor-pointer hover:scale-[1.02] transition-all duration-300 ease-in-out'
            >
              <motion.img
                src={item.icon}
                alt={item.title}
                width={50} // Slightly increased icon size
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }} // Staggered icon animation
                viewport={{ once: true }}
                className='flex-shrink-0'
              />
              <div className='flex-grow'> {/* Use flex-grow to make content take available space */}
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  viewport={{ once: true }}
                  className='text-xl sm:text-2xl font-semibold text-gray-800'
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                  viewport={{ once: true }}
                  className='text-base text-gray-600 mt-1'
                >
                  {item.description}
                </motion.p>
              </div>
            </motion.div>
          ))
        }
      </motion.div>
    </motion.section>
  );
};

export default Steps;