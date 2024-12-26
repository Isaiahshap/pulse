import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import MobileMenu from './MobileMenu'

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-blackPulse py-4' : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-3xl font-display text-white uppercase tracking-wider">
              Pulse<span className="text-orangePulse">.</span>
            </Link>

            {/* Desktop Navigation (only visible on lg screens and up) */}
            <div className="hidden lg:flex items-center gap-12">
              <div className="flex gap-8">
                <Link to="/classes" className="text-white hover:text-orangePulse transition-colors uppercase font-medium">
                  Classes
                </Link>
                <Link to="/trainers" className="text-white hover:text-orangePulse transition-colors uppercase font-medium">
                  Trainers
                </Link>
                <Link to="/contact" className="text-white hover:text-orangePulse transition-colors uppercase font-medium">
                  Contact
                </Link>
              </div>

              <Link
                to="/membership"
                className="bg-orangePulse text-white px-8 py-3 uppercase font-bold tracking-wider 
                         hover:bg-white hover:text-orangePulse transition-all duration-300"
              >
                Join Now
              </Link>
            </div>

            {/* Mobile/Tablet Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-white p-2"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  )
}

export default Navbar 