import React from 'react'
import { assets, plans } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import axios from 'axios'

const BuyCredit = () => {

  const {user, loadCreditData, token, setShowLogin, navigate} = useAppContext()

  const init = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits payment',
      description: 'Purchase credits for image generation and modification',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const {data} = await axios.post('/api/user/verify', response)
          if (data.success) {
            loadCreditData()
            navigate('/')
            toast.success("Credit Added")
          } else {
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const paymenthandler = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true)
        return
      }

      const {data} = await axios.post('/api/user/pay', {planId})

      if (data.success) {
        init(data.order)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  }

  return (
    <motion.main initial={{opacity: 0.2, y: 100}} transition={{duration: 1}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className='min-h-[70vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the Plan</h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((plan, index) => (
          <div key={index} className='bg-white drop-shadow-sm order rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'>
            <img width={40} src={assets.logo_icon} alt="" />
            <p className='mt-3 mb-1 font-semibold'>{plan.id}</p>
            <p className='text-sm'>₹{plan.desc}</p>
            <p className='mt-6'><span className='text-3xl font-medium'>₹{plan.price * 5}</span> / {plan.credits} credits</p>
            <button onClick={() => paymenthandler(plan.id)} className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'>{user ? "Purchase" : "Get Started"}</button>
          </div>
        ))}
      </div>
    </motion.main>
  )
}

export default BuyCredit