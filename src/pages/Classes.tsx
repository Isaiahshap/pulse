import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
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

const Classes: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<ClassType | null>(null)
  
  const classTypes: ClassType[] = [
    {
      name: 'HIIT Training',
      description: 'High-intensity interval training that burns maximum calories and improves cardiovascular fitness.',
      duration: '45 min',
      level: 'All Levels',
      trainer: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=1200',
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

  // Class detail modal
  const ClassDetailModal = ({ classInfo, onClose }: { classInfo: ClassType; onClose: () => void }) => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gradient-to-br from-blackPulse to-black/95 p-8 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative border border-white/10"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Hero Image Section */}
        <div className="relative aspect-[21/9] mb-12 rounded-xl overflow-hidden group">
          <img 
            src={classInfo.image} 
            alt={classInfo.name} 
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blackPulse via-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <h3 className="text-6xl font-display text-white mb-3">{classInfo.name}</h3>
            <p className="text-xl font-athletic text-greyPulse max-w-2xl leading-relaxed">{classInfo.description}</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h4 className="text-2xl font-display text-orangePulse mb-6">Class Details</h4>
              <ul className="space-y-4">
                <li className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <span className="font-athletic text-xl text-greyPulse">Duration</span>
                  <span className="font-athletic text-xl text-white">{classInfo.duration}</span>
                </li>
                <li className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <span className="font-athletic text-xl text-greyPulse">Level</span>
                  <span className="font-athletic text-xl text-white">{classInfo.level}</span>
                </li>
                <li className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <span className="font-athletic text-xl text-greyPulse">Trainer</span>
                  <span className="font-athletic text-xl text-orangePulse">{classInfo.trainer}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-2xl font-display text-orangePulse mb-6">Benefits</h4>
              <div className="grid grid-cols-1 gap-3">
                {classInfo.benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-orangePulse">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="font-athletic text-xl text-greyPulse">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h4 className="text-2xl font-display text-orangePulse mb-6">Schedule</h4>
            <div className="space-y-3">
              {classInfo.schedule.map((time, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span className="text-orangePulse">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="font-athletic text-xl text-greyPulse">{time}</span>
                </div>
              ))}
            </div>

            <Link
              to="/schedule"
              className="mt-12 block w-full bg-gradient-to-r from-orangePulse to-yellow-500 text-white p-6 text-xl font-athletic uppercase tracking-wider text-center rounded-lg hover:from-white hover:to-white hover:text-orangePulse transition-all duration-300 transform hover:scale-[1.02]"
            >
              Book This Class
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <>
      <Navbar />
      <main className="bg-blackPulse text-white">
        {/* Hero Section */}
        <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-blackPulse"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-7xl font-display uppercase mb-4">
              Elite Training
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orangePulse to-yellow-500">
                Premium Results
              </span>
            </h1>
            <p className="font-athletic text-2xl text-greyPulse max-w-3xl mx-auto leading-relaxed tracking-wide">
              Experience transformation through our carefully curated selection of high-performance fitness classes, 
              led by world-class trainers.
            </p>
          </div>
        </section>

        {/* Classes Grid */}
        <section className="max-w-7xl mx-auto px-4 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {classTypes.map((classType, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-lg cursor-pointer bg-black/30 hover:bg-black/50 transition-all duration-300"
                onClick={() => setSelectedClass(classType)}
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img 
                    src={classType.image} 
                    alt={classType.name}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-3xl font-display text-white mb-2">{classType.name}</h3>
                    <div className="space-y-1 font-athletic text-lg">
                      <p className="text-greyPulse">{classType.duration}</p>
                      <p className="text-orangePulse">{classType.trainer}</p>
                      <p className="text-white/70">{classType.level}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orangePulse to-yellow-500 opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-6xl font-display uppercase mb-8">Ready to Transform?</h2>
            <p className="font-athletic text-2xl text-greyPulse mb-12 max-w-3xl mx-auto">
              Join our community of dedicated athletes and fitness enthusiasts. 
              Your journey to excellence starts here.
            </p>
            <button className="bg-gradient-to-r from-orangePulse to-yellow-500 text-white px-16 py-5 text-2xl font-athletic uppercase tracking-wider hover:from-white hover:to-white hover:text-orangePulse transition-all duration-300 transform hover:scale-105">
              Book Your First Class
            </button>
          </div>
        </section>
      </main>
      <Footer />
      {selectedClass && <ClassDetailModal classInfo={selectedClass} onClose={() => setSelectedClass(null)} />}
    </>
  )
}

export default Classes 