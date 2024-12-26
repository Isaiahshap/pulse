import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion, useAnimation } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

// Define trainer interface
interface Trainer {
  id: number
  name: string
  specialty: string
  experience: string
  image: string
  bio: string
  certifications: string[]
  schedule: string[]
  instagram: string
  achievements: string[]
}

// Mock trainer data
const TRAINERS: Trainer[] = [
  {
    id: 1,
    name: "Alex Rivera",
    specialty: "CrossFit & Strength",
    experience: "10+ Years",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200",
    bio: "Former Olympic athlete turned elite trainer, specializing in explosive strength and conditioning.",
    certifications: ["CrossFit Level 3", "NSCA CSCS", "USA Weightlifting Level 2"],
    schedule: ["Mon/Wed/Fri 6:00 AM", "Tue/Thu 5:30 PM"],
    instagram: "@alex.power",
    achievements: ["Olympic Team 2016", "National Champion 2015", "Featured in Fitness Magazine"]
  },
  {
    id: 2,
    name: "Marcus Chen",
    specialty: "HIIT & Nutrition",
    experience: "8 Years",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1200",
    bio: "Transforming lives through high-intensity training and precision nutrition planning.",
    certifications: ["NASM CPT", "Precision Nutrition Level 2", "TRX Certified"],
    schedule: ["Mon/Wed 7:00 AM", "Tue/Thu/Fri 6:30 PM"],
    instagram: "@sarah.fit",
    achievements: ["Trainer of the Year 2022", "100+ Client Transformations", "Wellness Speaker"]
  },
  {
    id: 3,
    name: "Sarah Stone",
    specialty: "Power Lifting",
    experience: "12 Years",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200",
    bio: "Record-holding powerlifter dedicated to building strength through perfect form.",
    certifications: ["IPF Coach", "NSCA CSCS", "Westside Barbell Certified"],
    schedule: ["Mon/Wed/Fri 5:00 AM", "Tue/Thu 7:30 PM"],
    instagram: "@stone.strong",
    achievements: ["World Record Holder", "National Champion 2020", "Elite Coaching Certification"]
  },
  // Add more trainers as needed
]

const Trainers: React.FC = () => {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  // Add loading state
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading of resources
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Enhanced scroll handling
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-blackPulse flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-white text-2xl font-athletic"
        >
          Loading...
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main className="bg-blackPulse text-white min-h-screen">
        {/* Enhanced Hero Section */}
        <section className="relative h-[100vh] overflow-hidden">
          <motion.div 
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1549476464-37392f717541')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Enhanced overlay gradients */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ duration: 0.8 }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            
            {/* Animated grain texture */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
          </motion.div>

          {/* Enhanced Content Section */}
          <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0, 1] }}
              className="max-w-4xl"
            >
              <motion.h1 
                className="text-[12vw] lg:text-[12rem] font-display leading-[0.8] tracking-tighter"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                ELITE
                <motion.span 
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-orangePulse via-red-500 to-yellow-500 animate-gradient-x"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  TRAINERS
                </motion.span>
              </motion.h1>
              <motion.p 
                className="font-athletic text-2xl text-greyPulse mt-6 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Train with the best. Our world-class coaches bring decades of experience
                and proven results to every session.
              </motion.p>
            </motion.div>
          </div>

          {/* Enhanced geometric decorations */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="relative h-[25vh]">
              <motion.div 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orangePulse to-red-500 transform -skew-y-[12deg] origin-bottom-right"></div>
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay transform -skew-y-[12deg] origin-bottom-right"></div>
                <div className="absolute bottom-[20%] left-0 right-0 h-[1px] bg-white/10 transform -skew-y-[12deg]"></div>
                <div className="absolute bottom-[40%] left-0 right-0 h-[1px] bg-white/10 transform -skew-y-[12deg]"></div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/20 transform -skew-y-[12deg]"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Updated Trainers Grid Section */}
        <section className="relative py-32 z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TRAINERS.map((trainer, index) => (
                <motion.div
                  key={trainer.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4,
                    delay: Math.min(index * 0.1, 0.3),
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  className="bg-zinc-900/50 rounded-lg overflow-hidden hover:bg-zinc-800/50 transition-colors duration-300"
                >
                  <div className="flex flex-col h-full">
                    {/* Trainer Image Header - Smaller and contained */}
                    <div className="relative h-48 overflow-hidden">
                      <LazyLoadImage
                        src={trainer.image}
                        alt={trainer.name}
                        effect="blur"
                        className="w-full h-full object-cover"
                        placeholderSrc={`${trainer.image}?w=50&q=10`}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-900 to-transparent h-20" />
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Trainer Name and Specialty */}
                      <div className="mb-4">
                        <h3 className="text-2xl font-display mb-1">{trainer.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="h-1 w-6 bg-orangePulse"></span>
                          <span className="text-orangePulse font-athletic">{trainer.specialty}</span>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="flex items-center space-x-4 mb-4 text-sm text-greyPulse">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          {trainer.experience}
                        </div>
                        <span className="w-1 h-1 bg-greyPulse rounded-full" />
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                          </svg>
                          {trainer.certifications.length} Certifications
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-greyPulse mb-4">{trainer.bio}</p>

                      {/* Certifications */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {trainer.certifications.slice(0, 3).map((cert, idx) => (
                          <span key={idx} className="text-xs bg-orangePulse/10 text-orangePulse px-2 py-1 rounded-md">
                            {cert}
                          </span>
                        ))}
                      </div>

                      {/* Schedule Preview */}
                      <div className="mt-auto">
                        <div className="text-xs uppercase text-greyPulse mb-2">Available Times</div>
                        <div className="flex flex-wrap gap-2">
                          {trainer.schedule.slice(0, 2).map((time, idx) => (
                            <span key={idx} className="text-xs bg-zinc-800 px-2 py-1 rounded">
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <button 
                        onClick={() => setSelectedTrainer(trainer)}
                        className="mt-6 w-full bg-orangePulse/10 hover:bg-orangePulse text-orangePulse hover:text-white 
                                 py-3 px-4 rounded transition-colors duration-300 font-athletic text-sm"
                      >
                        SCHEDULE SESSION
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orangePulse to-red-500"></div>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl lg:text-8xl font-display text-white mb-8">
                START YOUR JOURNEY
              </h2>
              <Link
                to="/contact"
                className="inline-block px-12 py-6 bg-blackPulse text-white text-xl font-athletic 
                         hover:bg-white hover:text-blackPulse transition-all duration-300"
              >
                BOOK A SESSION
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Trainers 