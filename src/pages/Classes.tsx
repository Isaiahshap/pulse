import React, { useState, useCallback, memo, Suspense, lazy, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion, useAnimation } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'

// Lazy load the modal
const ClassModal = lazy(() => import('../components/ClassModal'))

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

const CLASS_TYPES: ClassType[] = [
  {
    name: 'HIIT Training',
    description: 'High-intensity interval training that burns maximum calories and improves cardiovascular fitness.',
    duration: '45 min',
    level: 'All Levels',
    trainer: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=800',
    benefits: ['Burn up to 1000 calories', 'Improve endurance', 'Boost metabolism', 'Build lean muscle'],
    schedule: ['Mon/Wed/Fri 6:00 AM', 'Tue/Thu 7:30 PM', 'Sat 9:00 AM']
  },
  {
    name: 'Strength & Power',
    description: 'Build muscle and increase strength through progressive resistance training and compound movements.',
    duration: '60 min',
    level: 'Intermediate',
    trainer: 'Mike Thompson',
    image: 'https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?q=80&w=1200',
    benefits: ['Increase muscle mass', 'Enhance core strength', 'Improve posture', 'Boost bone density'],
    schedule: ['Mon/Wed/Fri 7:00 AM', 'Tue/Thu 6:30 PM', 'Sat 10:00 AM']
  },
  {
    name: 'Yoga Flow',
    description: 'Connect mind and body through dynamic movements and poses that improve flexibility and balance.',
    duration: '75 min',
    level: 'All Levels',
    trainer: 'Emma Davis',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1200',
    benefits: ['Increase flexibility', 'Reduce stress', 'Improve balance', 'Enhanced mindfulness'],
    schedule: ['Tue/Thu 8:00 AM', 'Mon/Wed 6:00 PM', 'Sun 9:00 AM']
  },
  {
    name: 'Boxing',
    description: 'Learn proper technique while getting an intense full-body workout that builds strength and agility.',
    duration: '60 min',
    level: 'Beginner',
    trainer: 'James Wilson',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200',
    benefits: ['Full body workout', 'Improved coordination', 'Stress relief', 'Self-defense skills'],
    schedule: ['Mon/Wed/Fri 8:00 AM', 'Tue/Thu 7:00 PM', 'Sat 11:00 AM']
  },
  {
    name: 'CrossFit Elite',
    description: 'Push your limits with our high-intensity functional training program combining gymnastics, weightlifting, and cardio.',
    duration: '60 min',
    level: 'Advanced',
    trainer: 'Alex Rivera',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1200',
    benefits: ['Full body conditioning', 'Increased power output', 'Athletic performance', 'Community support'],
    schedule: ['Mon/Wed/Fri 5:30 AM', 'Tue/Thu 6:30 PM', 'Sat 8:00 AM']
  },
  {
    name: 'Spin Studio',
    description: 'High-energy indoor cycling sessions synchronized to powerful music and motivational coaching.',
    duration: '45 min',
    level: 'All Levels',
    trainer: 'Maya Chen',
    image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=1200',
    benefits: ['Cardio endurance', 'Lower body strength', 'Fat burning', 'Mental focus'],
    schedule: ['Mon-Fri 6:00 AM', 'Mon/Wed 7:30 PM', 'Sat/Sun 9:00 AM']
  },
  {
    name: 'Power Pilates',
    description: 'Modern approach to classical Pilates, incorporating dynamic movements and resistance training.',
    duration: '55 min',
    level: 'Intermediate',
    trainer: 'Sofia Rodriguez',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200',
    benefits: ['Core strength', 'Flexibility', 'Posture improvement', 'Mind-body connection'],
    schedule: ['Tue/Thu 9:00 AM', 'Mon/Wed 5:30 PM', 'Sat 10:30 AM']
  },
  {
    name: 'Beast Mode',
    description: 'Intense strength training focusing on compound movements and progressive overload principles.',
    duration: '75 min',
    level: 'Advanced',
    trainer: 'Marcus Stone',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1200',
    benefits: ['Maximum strength gains', 'Muscle hypertrophy', 'Performance enhancement', 'Expert coaching'],
    schedule: ['Mon/Wed/Fri 6:30 AM', 'Tue/Thu 8:00 PM', 'Sat 7:00 AM']
  }
]

const Classes: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<ClassType | null>(null)
  const [hoveredClass, setHoveredClass] = useState<string | null>(null)
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  // Add new animation controls
  const heroControls = useAnimation()
  const [heroRef, heroInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  // Add this state at the top of the component
  const [scrollY, setScrollY] = useState(0)

  // Enhanced parallax effect
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

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 })
    }
  }, [controls, inView])

  const handleClassHover = useCallback((name: string | null) => {
    setHoveredClass(name);
  }, []);

  const handleClassSelect = useCallback((classInfo: ClassType | null) => {
    setSelectedClass(classInfo);
  }, []);

  const renderClassCard = useCallback((classType: ClassType, index: number) => (
    <motion.div
      key={classType.name}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0, 1]
      }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 
                    group-hover:opacity-90 transition-all duration-500" />
      
      <motion.img 
        src={classType.image}
        alt={classType.name}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
      />

      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <h3 className="text-3xl font-display mb-2 transform group-hover:translate-y-[-10px] transition-transform duration-500">
          {classType.name}
        </h3>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="transform group-hover:translate-y-[-10px] transition-transform duration-500"
        >
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm font-athletic text-greyPulse">{classType.duration}</span>
            <span className="w-1 h-1 bg-orangePulse rounded-full" />
            <span className="text-sm font-athletic text-greyPulse">{classType.level}</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-orangePulse/90 flex items-center justify-center">
              <svg className="w-4 h-4 text-orangePulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-sm font-athletic text-white">{classType.trainer}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  ), [hoveredClass, handleClassSelect]);

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading of resources
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
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
          {/* Dynamic Background with multiple layers */}
          <motion.div 
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1534258936925-c58bed479fcb')`,
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
                OUR
                <motion.span 
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-orangePulse via-red-500 to-yellow-500 animate-gradient-x"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  CLASSES
                </motion.span>
              </motion.h1>
            </motion.div>

            {/* New decorative elements */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute left-4 top-1/3 hidden lg:block"
            >
              <div className="w-[1px] h-[200px] bg-gradient-to-b from-transparent via-orangePulse to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute right-8 bottom-1/4 hidden lg:block"
            >
              <div className="text-[200px] font-display leading-none opacity-5 text-white">X</div>
            </motion.div>
          </div>

          {/* Enhanced geometric decorations */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="relative h-[25vh]">
              {/* Main diagonal slice */}
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

        <section className="relative py-32 bg-gradient-to-r from-orangePulse to-yellow-500">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
          
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-7xl font-display text-white mb-6 leading-none">
                  TRANSFORM YOUR
                  <span className="block text-blackPulse">POTENTIAL</span>
                </h2>
                <p className="font-athletic text-xl text-white/90 mb-8 leading-relaxed">
                  Our diverse range of classes combines cutting-edge training methodologies 
                  with expert instruction, designed to push your limits and achieve 
                  extraordinary results.
                </p>
                <div className="flex flex-wrap gap-6">
                  <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg">
                    <p className="text-4xl font-display text-white mb-2">8+</p>
                    <p className="text-sm font-athletic text-white/70">Class Categories</p>
                  </div>
                  <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg">
                    <p className="text-4xl font-display text-white mb-2">45-75</p>
                    <p className="text-sm font-athletic text-white/70">Minutes Per Class</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1200" 
                    alt="Fitness Class"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="absolute -bottom-8 -left-8 bg-blackPulse p-6 rounded-lg shadow-xl">
                  <p className="text-sm font-athletic text-greyPulse mb-2">Next Class Starting</p>
                  <p className="text-3xl font-display text-white">10:30 AM</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-[8vw] lg:text-8xl font-display leading-none mb-6">
              FIND YOUR
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orangePulse to-yellow-500">
                PERFECT CLASS
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CLASS_TYPES.map((classType, index) => (
              <motion.div
                key={classType.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0, 1]
                }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => handleClassSelect(classType)}
              >
                <motion.img 
                  src={classType.image}
                  alt={classType.name}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                {/* Stronger, more visible gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black from-40% via-black/50 via-75% to-transparent" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-3xl font-display mb-3 transform group-hover:translate-y-[-10px] transition-transform duration-500
                               text-white drop-shadow-lg">
                    {classType.name}
                  </h3>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="transform group-hover:translate-y-[-10px] transition-transform duration-500"
                  >
                    <p className="text-white/90 mb-4 font-athletic text-sm leading-relaxed">
                      {classType.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-sm font-athletic text-white/90">{classType.duration}</span>
                      <span className="w-1 h-1 bg-orangePulse rounded-full" />
                      <span className="text-sm font-athletic text-white/90">{classType.level}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-orangePulse/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-orangePulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="text-sm font-athletic text-white">{classType.trainer}</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA section */}
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
                READY TO START?
              </h2>
              <Link
                to="/membership"
                className="inline-block px-12 py-6 bg-blackPulse text-white text-xl font-athletic 
                         hover:bg-white hover:text-blackPulse transition-all duration-300"
              >
                JOIN NOW
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      {selectedClass && (
        <Suspense fallback={
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-white">Loading...</div>
          </div>
        }>
          <ClassModal classInfo={selectedClass} onClose={() => handleClassSelect(null)} />
        </Suspense>
      )}
    </>
  )
}

export default memo(Classes) 