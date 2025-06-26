import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testimonial from '../components/Testimonial'
import GenerateBtn from '../components/GenerateBtn'

const Home = () => {
  return (
    <main>
        <Header />
        <Steps />
        <Description />
        <Testimonial />
        <GenerateBtn />
    </main>
  )
}

export default Home