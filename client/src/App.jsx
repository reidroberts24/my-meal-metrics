import React, { useState } from 'react'
import './App.css'
import LandingPage from './views/LandingPage'
import Dashboard from './views/Dashbboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
function App() {
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={ <LandingPage />} />
        <Route path="/dashboard" element={ <Dashboard />} />
      </Routes>
    </Router>

  )
}

export default App
