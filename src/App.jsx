import { useState } from 'react'
import './App.css'
import { products } from './data/productData';
import Navbar from './components/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
// import Cart from './pages/Cart';



const App = () => {
  return (
   <>
    <Navbar />
    <BrowserRouter basename="/">
      <Routes>
          <Route index element={<Home />} />
          {/* <Route path="Cart" element={<Cart />} /> */}
        </Routes>
    </BrowserRouter>
   </>
  )
}

export default App