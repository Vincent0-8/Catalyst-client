import { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import ProtectedRoute from './components/ProtectedRoute'
import Orders from './pages/Orders'
import Footer from './components/Footer'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const location = useLocation();
  const noFooterPaths = ['/cart', '/checkout', '/orders', '/login', '/register'];
  const showFooter = !noFooterPaths.includes(location.pathname);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })
  }, [])

  return (
   <div className="flex flex-col min-h-screen">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} theme="dark" />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        </Routes>
      </main>
      {showFooter && <Footer />}
   </div>
  )
}

export default App
