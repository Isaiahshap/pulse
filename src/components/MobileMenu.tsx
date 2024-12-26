import React from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { to: '/classes', label: 'Classes' },
    { to: '/trainers', label: 'Trainers' },
    { to: '/schedule', label: 'Schedule' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-blackPulse z-50"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white p-2"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Menu Content */}
            <div className="flex flex-col h-full pt-24 pb-8 px-8">
              {/* Logo */}
              <Link to="/" className="text-4xl font-display text-white mb-12" onClick={onClose}>
                Pulse<span className="text-orangePulse">.</span>
              </Link>

              {/* Navigation Links */}
              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.to}
                      onClick={onClose}
                      className="block text-3xl font-display text-white py-4 border-b border-white/10 
                               hover:text-orangePulse hover:border-orangePulse transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-auto"
              >
                <Link
                  to="/membership"
                  onClick={onClose}
                  className="block w-full py-6 bg-gradient-to-r from-orangePulse to-red-500 
                           text-white text-xl font-athletic text-center uppercase tracking-wider 
                           hover:from-white hover:to-white hover:text-blackPulse transition-all duration-300"
                >
                  Join Now
                </Link>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-orangePulse/20 to-transparent" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu 