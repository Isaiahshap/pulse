import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Classes from './pages/Classes'

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classes" element={<Classes />} />
        {/* Add more routes here as needed */}
        {/* <Route path="/trainers" element={<Trainers />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </div>
  )
}

export default App
