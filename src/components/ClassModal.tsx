import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface ClassType {
  name: string
  description: string
  duration: string
  level: string
  trainer: string
  image: string
  benefits: string[]
  schedule: string[]
}

interface ClassModalProps {
  classInfo: ClassType
  onClose: () => void
}

const ClassModal: React.FC<ClassModalProps> = ({ classInfo, onClose }) => {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className="bg-blackPulse w-full max-w-3xl rounded-xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex h-[600px]">
            {/* Left Side - Image */}
            <div className="w-1/2 relative">
              <img 
                src={classInfo.image} 
                alt={classInfo.name} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
            </div>
  
            {/* Right Side - Content */}
            <div className="w-1/2 p-8 relative">
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Content */}
              <div className="h-full flex flex-col">
                <h2 className="text-3xl font-display text-white mb-2">{classInfo.name}</h2>
                <p className="text-sm text-greyPulse mb-4 line-clamp-2">{classInfo.description}</p>
  
                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-white/5 p-2 rounded">
                    <p className="text-xs text-greyPulse">Duration</p>
                    <p className="text-sm font-athletic">{classInfo.duration}</p>
                  </div>
                  <div className="bg-white/5 p-2 rounded">
                    <p className="text-xs text-greyPulse">Level</p>
                    <p className="text-sm font-athletic">{classInfo.level}</p>
                  </div>
                </div>
  
                {/* Benefits */}
                <div className="mb-4">
                  <h3 className="text-sm font-display text-orangePulse mb-2">Benefits</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {classInfo.benefits.slice(0, 4).map((benefit, index) => (
                      <li key={index} className="text-xs text-greyPulse flex items-center">
                        <span className="text-orangePulse mr-1">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Next Available Times */}
                <div className="mb-4">
                  <h3 className="text-sm font-display text-orangePulse mb-2">Next Sessions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {classInfo.schedule.slice(0, 2).map((time, index) => (
                      <div key={index} className="text-xs text-greyPulse bg-white/5 p-2 rounded">
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
  
                {/* Trainer */}
                <div className="mb-4">
                  <h3 className="text-sm font-display text-orangePulse mb-2">Instructor</h3>
                  <p className="text-sm text-white">{classInfo.trainer}</p>
                </div>
  
                {/* CTA Button */}
                <Link
                  to="/schedule"
                  className="group relative mt-auto overflow-hidden"
                >
                  {/* Energetic background pulse effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orangePulse via-yellow-500 to-orangePulse bg-[length:200%_100%] animate-pulse-slow clip-path-sharp"></div>
                  
                  {/* Hover reveal layer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                  {/* Main content container */}
                  <div className="relative flex items-center justify-center py-3 px-6">
                    {/* Left energy bar */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-white group-hover:h-full transition-all duration-300 delay-100"></div>
                    
                    {/* Text and icon */}
                    <div className="flex items-center space-x-3">
                      {/* Pulse icon */}
                      <svg 
                        className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200"
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      
                      {/* Text */}
                      <span className="font-athletic text-sm uppercase tracking-wider text-white group-hover:tracking-widest transition-all duration-300">
                        Start Training
                      </span>
                      
                      {/* Arrow */}
                      <span className="relative w-4 h-4">
                        <span className="absolute inset-0 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-0">
                          →
                        </span>
                        <span className="absolute inset-0 text-white translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                          →
                        </span>
                      </span>
                    </div>
                    {/* Right energy bar */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-white group-hover:h-full transition-all duration-300 delay-100"></div>
                  </div>
                  
                  {/* Bottom energy bar */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-white group-hover:w-full transition-all duration-300 delay-200"></div>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

export default ClassModal 