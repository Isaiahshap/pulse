import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Hero: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState(1)

  useEffect(() => {
    // Function to handle video end and switch to the next video
    const handleVideoEnd = (videoElement: HTMLVideoElement, nextVideoElement: HTMLVideoElement) => {
      videoElement.classList.remove('opacity-100', 'scale-100')
      videoElement.classList.add('opacity-0', 'scale-105')
      nextVideoElement.classList.remove('opacity-0', 'scale-105')
      nextVideoElement.classList.add('opacity-100', 'scale-100')
      nextVideoElement.play()
      setActiveVideo(prev => prev === 1 ? 2 : 1)
    }

    const video1 = document.getElementById('hero-video-1') as HTMLVideoElement
    const video2 = document.getElementById('hero-video-2') as HTMLVideoElement

    if (video1 && video2) {
      video1.onended = () => handleVideoEnd(video1, video2)
      video2.onended = () => handleVideoEnd(video2, video1)
    }

    // Start playing the first video
    if (video1) {
      video1.play()
    }

    // Cleanup
    return () => {
      if (video1) video1.onended = null
      if (video2) video2.onended = null
    }
  }, [])

  return (
    <section className="relative w-full bg-blackPulse min-h-screen flex items-center overflow-hidden">
      {/* Video backgrounds with crossfade */}
      <div className="absolute inset-0 z-0">
        <video
          id="hero-video-1"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-2000 transform scale-100 opacity-100"
          muted
          playsInline
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <video
          id="hero-video-2"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-2000 transform scale-105 opacity-0"
          muted
          playsInline
        >
          <source src="/hero2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-transparent opacity-75">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50"></div>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0, 1] }}
          className="max-w-4xl"
        >
          <h1 className="text-[12vw] lg:text-[12rem] font-display leading-[0.8] tracking-tighter">
            PUSH
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orangePulse via-red-500 to-yellow-500 animate-gradient-x">
              YOUR LIMITS
            </span>
          </h1>
          
          <p className="font-athletic text-2xl text-greyPulse mt-6 max-w-2xl">
            Experience luxury fitness with cutting-edge equipment and elite personal training. 
            Your journey to excellence begins here.
          </p>

          <div className="flex gap-6 mt-8">
            <Link
              to="/membership"
              className="group relative px-12 py-4 overflow-hidden bg-gradient-to-r from-orangePulse to-red-500 
                       text-xl font-athletic uppercase tracking-wider text-white
                       hover:from-white hover:to-white hover:text-blackPulse transition-all duration-300"
            >
              Start Now
            </Link>
            <Link
              to="/schedule"
              className="px-12 py-4 border-2 border-white/30 text-white text-xl font-athletic 
                       uppercase tracking-wider hover:bg-white/10 transition-all duration-300 
                       backdrop-blur-sm"
            >
              View Schedule
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero 