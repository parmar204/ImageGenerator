import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy-credit' element={<BuyCredit />} />
      </Routes>
    </div>
  )
}
export default App