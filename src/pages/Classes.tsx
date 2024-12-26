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

  // Add parallax scroll effect for hero section
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  ), [hoveredClass, handleClassSelect]);

  return (
    <>
      <Navbar />
      <main className="bg-blackPulse text-white min-h-screen">
        <section className="relative h-[100vh] overflow-hidden">
          {/* Dynamic Background with multiple layers */}
          <motion.div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1534258936925-c58bed479fcb')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              y: scrollY * 0.5,
              scale: 1 + (scrollY * 0.0005),
            }}
          >
            {/* Overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-transparent opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50" />
            
            {/* Animated grain texture */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
          </motion.div>

          {/* Content Section */}
          <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0, 1] }}
              className="max-w-4xl"
            >
              <h1 className="text-[12vw] lg:text-[12rem] font-display leading-[0.8] tracking-tighter">
                OUR
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orangePulse via-red-500 to-yellow-500 animate-gradient-x">
                  CLASSES
                </span>
              </h1>
            </motion.div>

            {/* Animated decorative elements */}
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
                {/* Primary diagonal */}
                <div className="absolute inset-0 bg-gradient-to-r from-orangePulse to-yellow-500 transform -skew-y-[12deg] origin-bottom-right"></div>
                
                {/* Texture overlay */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay transform -skew-y-[12deg] origin-bottom-right"></div>
                
                {/* Additional decorative lines */}
                <div className="absolute bottom-[20%] left-0 right-0 h-[1px] bg-white/10 transform -skew-y-[12deg]"></div>
                <div className="absolute bottom-[40%] left-0 right-0 h-[1px] bg-white/10 transform -skew-y-[12deg]"></div>
                
                {/* Accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/20 transform -skew-y-[12deg]"></div>
              </motion.div>

              {/* Secondary diagonal overlay */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="absolute bottom-0 left-0 right-0 h-[70%] overflow-hidden"
              >
                <div className="absolute inset-0 bg-blackPulse transform -skew-y-[14deg] origin-bottom-left translate-y-[50%] opacity-50"></div>
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

        <section className="py-24 relative contain-content">
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black/0 opacity-40"></div>
          
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
              {[
                { label: 'Weekly Classes', value: '120+' },
                { label: 'Expert Trainers', value: '15' },
                { label: 'Class Types', value: '24' },
                { label: 'Member Rating', value: '4.9' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl font-display text-white mb-2">
                    {stat.value}
                  </p>
                  <p className="font-athletic text-sm text-greyPulse uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orangePulse to-yellow-500 opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-6xl font-display mb-6">
                  Elite Training
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orangePulse to-yellow-500">
                    Experience
                  </span>
                </h2>
                <p className="font-athletic text-xl text-greyPulse mb-8 leading-relaxed">
                  Our signature programs combine cutting-edge training methodologies with personalized coaching, 
                  ensuring maximum results for every member.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {[
                    { label: 'Class Duration', value: '75 min' },
                    { label: 'Max Participants', value: '8' },
                    { label: 'Experience Level', value: 'Advanced' },
                    { label: 'Calories Burn', value: '800-1000' }
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                      <p className="text-sm text-greyPulse mb-1">{stat.label}</p>
                      <p className="text-2xl font-display text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <Link
                  to="/membership"
                  className="inline-flex items-center gap-3 group"
                >
                  <span className="text-xl font-athletic text-white group-hover:text-orangePulse transition-colors">
                    Join Elite Program
                  </span>
                  <svg 
                    className="w-6 h-6 text-orangePulse transform group-hover:translate-x-2 transition-transform"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden"
              >
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
                  alt="Elite Training"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-8 left-8 right-8 flex justify-between">
                  <div className="bg-black/60 backdrop-blur-md p-4 rounded-lg">
                    <p className="text-sm text-greyPulse">Weekly Sessions</p>
                    <p className="text-2xl font-display text-white">3x</p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md p-4 rounded-lg">
                    <p className="text-sm text-greyPulse">Success Rate</p>
                    <p className="text-2xl font-display text-white">94%</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CLASS_TYPES.map((classType, index) => renderClassCard(classType, index))}
          </div>
        </section>

        <section className="py-24 bg-gradient-to-b from-transparent to-black/20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-display mb-4">Today's Schedule</h2>
              <p className="font-athletic text-xl text-greyPulse">Reserve your spot in our premium fitness experiences</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { time: '06:00 AM', class: 'HIIT Training', spots: '4 spots left', trainer: 'Sarah Johnson' },
                { time: '08:30 AM', class: 'Power Yoga', spots: '6 spots left', trainer: 'Emma Davis' },
                { time: '12:00 PM', class: 'Strength & Power', spots: '3 spots left', trainer: 'Mike Thompson' },
              ].map((session, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 transform transition-all duration-300
                             hover:bg-white/10 hover:shadow-lg hover:shadow-black/20"
                >
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-2xl font-display text-white">{session.time}</p>
                    <span className="px-3 py-1 bg-orangePulse/20 text-orangePulse text-sm rounded-full">
                      {session.spots}
                    </span>
                  </div>
                  <h3 className="text-xl font-athletic mb-2">{session.class}</h3>
                  <p className="text-sm text-greyPulse mb-4">with {session.trainer}</p>
                  <button className="w-full py-2 border border-orangePulse/30 text-white font-athletic 
                                   hover:bg-gradient-to-r from-orangePulse to-yellow-500 hover:border-transparent
                                   transition-all duration-300">
                    Book Now
                  </button>
                </motion.div>
              ))}
            </div>
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