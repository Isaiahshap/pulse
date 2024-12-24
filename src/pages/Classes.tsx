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

const CATEGORY_DATA = [
  { 
    name: 'All Classes', 
    count: '24',
    tooltip: 'HIIT Training, Yoga Flow, Boxing, CrossFit Elite, and more'
  },
  { 
    name: 'Strength', 
    count: '8',
    tooltip: 'Strength & Power, Beast Mode, PowerLifting, Olympic Lifting'
  },
  { 
    name: 'HIIT', 
    count: '6',
    tooltip: 'HIIT Training, Tabata, Circuit Training, MetCon'
  },
  { 
    name: 'Mind & Body', 
    count: '5',
    tooltip: 'Yoga Flow, Power Pilates, Meditation, Stretching'
  },
  { 
    name: 'Combat', 
    count: '3',
    tooltip: 'Boxing, Kickboxing, MMA Conditioning'
  },
  { 
    name: 'Recovery', 
    count: '2',
    tooltip: 'Mobility & Recovery, Deep Stretch'
  }
]

const FEATURED_CATEGORIES = [
  {
    title: 'High Intensity',
    description: 'Push your limits with dynamic, full-body workouts',
    image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb',
    stats: [
      { label: 'Calories', value: '800+' },
      { label: 'Duration', value: '45-60m' }
    ]
  },
  {
    title: 'Strength & Power',
    description: 'Build muscle and increase strength with expert guidance',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c',
    stats: [
      { label: 'Focus Areas', value: '5+' },
      { label: 'Duration', value: '60m' }
    ]
  },
  {
    title: 'Mind & Body',
    description: 'Find balance through movement and mindfulness',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
    stats: [
      { label: 'Intensity', value: 'Low' },
      { label: 'Duration', value: '50m' }
    ]
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

  const renderCategoryButton = useCallback((category: any, index: number) => (
    <motion.button
      key={category.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative px-8 py-3"
      title={category.tooltip}
    >
      <div className="absolute inset-0 bg-white/5 rounded-lg group-hover:bg-gradient-to-r from-orangePulse to-yellow-500 transition-all duration-300"></div>
      
      <div className="relative flex items-center gap-3">
        <span className="font-athletic text-lg text-white group-hover:text-white transition-colors">
          {category.name}
        </span>
        <span className="text-sm text-greyPulse group-hover:text-white/80 transition-colors">
          ({category.count})
        </span>
      </div>
    </motion.button>
  ), []);

  const renderClassCard = useCallback((classType: ClassType, index: number) => (
    <motion.div
      key={classType.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => handleClassHover(classType.name)}
      onHoverEnd={() => handleClassHover(null)}
      onClick={() => handleClassSelect(classType)}
      className="group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0">
        <img 
          loading="lazy"
          decoding="async"
          src={classType.image} 
          alt={classType.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
      </div>

      <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-500 group-hover:translate-y-[-10px]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h3 className="text-3xl font-display mb-2">{classType.name}</h3>
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
        <section className="relative h-[60vh] overflow-hidden">
          <motion.div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1534258936925-c58bed479fcb')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: hoveredClass ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.8s'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
          </motion.div>
          
          <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
            <motion.h1 
              className="text-8xl font-display"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              OUR CLASSES
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orangePulse to-yellow-500">
                FIND YOUR FIT
              </span>
            </motion.h1>
          </div>
        </section>

        <section className="py-24 relative contain-content">
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black/0 opacity-40"></div>
          
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-6 mb-20">
              {CATEGORY_DATA.map(renderCategoryButton)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURED_CATEGORIES.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden"
                >
                  <div className="absolute inset-0">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
                  </div>

                  <div className="relative h-full p-8 flex flex-col justify-end">
                    <div className="transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                      <h3 className="text-3xl font-display text-white mb-2">
                        {category.title}
                      </h3>
                      <p className="text-sm text-greyPulse mb-4 line-clamp-2">
                        {category.description}
                      </p>
                      
                      <div className="flex gap-4 mb-6">
                        {category.stats.map((stat, i) => (
                          <div key={i} className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded">
                            <p className="text-xs text-greyPulse">{stat.label}</p>
                            <p className="text-lg font-athletic text-white">{stat.value}</p>
                          </div>
                        ))}
                      </div>

                      <Link
                        to={`/classes/${category.title.toLowerCase().replace(/ & /g, '-')}`}
                        className="inline-flex items-center gap-2 text-white group/link"
                      >
                        <span className="font-athletic text-sm uppercase tracking-wider group-hover/link:text-orangePulse transition-colors">
                          Explore Classes
                        </span>
                        <svg 
                          className="w-4 h-4 text-orangePulse transform transition-transform group-hover/link:translate-x-1"
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

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