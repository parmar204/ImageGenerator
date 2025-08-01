import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { useAppContext } from './context/AppContext'
import { Toaster } from 'react-hot-toast'
import ModifyImage from './pages/ModifyImage'

const App = () => {

  const {showLogin} = useAppContext()
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <Toaster />
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy-credit' element={<BuyCredit />} />
        <Route path='/modify' element={<ModifyImage />} />
      </Routes>
      <Footer />
    </div>
  )
}
export default App