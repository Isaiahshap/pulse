import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-blackPulse py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-3xl font-display text-white uppercase tracking-wider">
            Pulse
            <span className="text-orangePulse">.</span>
          </Link>

          <div className="flex items-center gap-12">
            <div className="hidden md:flex gap-8">
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
              className="bg-orangePulse text-white px-8 py-3 uppercase font-bold tracking-wider hover:bg-white hover:text-orangePulse transition-all duration-300"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 