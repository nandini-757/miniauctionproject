import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Signin from './pages/SignIn';
import Signup from './pages/SignUp';
import AuctionDashboard from './pages/Dashboard';
import PostAuction from './pages/PostAuction';
import CloseAuction from './pages/CloseAuction';
function App() {


  return (
    <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<AuctionDashboard />} />
      <Route path="/post-auction" element={<PostAuction />} />
      <Route path="/close-auction" element={<CloseAuction />} />
    </Routes>
    <Footer />
  </Router>
  )
}

export default App
