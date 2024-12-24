import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DynamicShapes from './DynamicShapes'

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
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-3xl space-y-0">
          <div className="overflow-hidden">
            <h1 className="text-[140px] leading-tight font-display uppercase text-white animate-slide-up">
              Push Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orangePulse to-yellow-500 mt-[-0.1em]">
                Limits
              </span>
            </h1>
          </div>
          <p className="font-athletic text-2xl text-greyPulse max-w-2xl animate-fade-in opacity-90 leading-relaxed tracking-normal">
            Experience luxury fitness with cutting-edge equipment and elite personal training. 
            Your journey to excellence begins here.
          </p>
          <div className="flex gap-6 pt-4">
            <Link
              to="/membership"
              className="group relative px-12 py-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orangePulse to-yellow-500 transition-transform duration-300 group-hover:scale-105"></div>
              <span className="relative text-xl font-athletic uppercase tracking-wider text-white">
                Start Now
              </span>
            </Link>
            <Link
              to="/schedule"
              className="relative px-12 py-4 border-2 border-white/30 text-white text-xl font-athletic uppercase tracking-wider hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              View Schedule
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 