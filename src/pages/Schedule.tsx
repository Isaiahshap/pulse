import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Define schedule data structure
interface ScheduleClass {
  time: string
  name: string
  trainer: string
  duration: string
  level: string
}

interface DaySchedule {
  [key: string]: ScheduleClass[]
}

const weekSchedule: { [key: string]: DaySchedule } = {
  'Monday': {
    'Morning': [
      { time: '06:00', name: 'HIIT Fusion', trainer: 'Sarah Johnson', duration: '45 min', level: 'All Levels' },
      { time: '07:30', name: 'Power Lifting', trainer: 'Mike Thompson', duration: '60 min', level: 'Intermediate' },
      { time: '09:00', name: 'Yoga Flow', trainer: 'Emma Davis', duration: '75 min', level: 'All Levels' },
    ],
    'Afternoon': [
      { time: '12:00', name: 'Boxing', trainer: 'James Wilson', duration: '60 min', level: 'Beginner' },
      { time: '14:30', name: 'Spin Studio', trainer: 'Maya Chen', duration: '45 min', level: 'All Levels' },
    ],
    'Evening': [
      { time: '17:00', name: 'CrossFit Elite', trainer: 'Alex Rivera', duration: '60 min', level: 'Advanced' },
      { time: '18:30', name: 'Beast Mode', trainer: 'Marcus Stone', duration: '75 min', level: 'Advanced' },
      { time: '20:00', name: 'Power Pilates', trainer: 'Sofia Rodriguez', duration: '55 min', level: 'Intermediate' },
    ],
  },
  'Tuesday': {
    'Morning': [
      { time: '06:00', name: 'Cardio Blast', trainer: 'Maya Chen', duration: '45 min', level: 'All Levels' },
      { time: '07:30', name: 'Strength & Core', trainer: 'Alex Rivera', duration: '60 min', level: 'Intermediate' },
      { time: '09:00', name: 'Mindful Flow', trainer: 'Emma Davis', duration: '60 min', level: 'All Levels' },
    ],
    'Afternoon': [
      { time: '12:00', name: 'Kickboxing', trainer: 'James Wilson', duration: '60 min', level: 'Intermediate' },
      { time: '14:30', name: 'TRX Training', trainer: 'Mike Thompson', duration: '45 min', level: 'All Levels' },
    ],
    'Evening': [
      { time: '17:00', name: 'Power Yoga', trainer: 'Sofia Rodriguez', duration: '75 min', level: 'Intermediate' },
      { time: '18:30', name: 'Circuit Training', trainer: 'Sarah Johnson', duration: '60 min', level: 'Advanced' },
      { time: '20:00', name: 'Recovery Flow', trainer: 'Emma Davis', duration: '45 min', level: 'All Levels' },
    ],
  },
  'Wednesday': {
    'Morning': [
      { time: '06:00', name: 'HIIT & Core', trainer: 'Marcus Stone', duration: '45 min', level: 'Intermediate' },
      { time: '07:30', name: 'Olympic Lifting', trainer: 'Mike Thompson', duration: '75 min', level: 'Advanced' },
      { time: '09:00', name: 'Vinyasa Flow', trainer: 'Emma Davis', duration: '60 min', level: 'All Levels' },
    ],
    'Afternoon': [
      { time: '12:00', name: 'Combat Fitness', trainer: 'James Wilson', duration: '60 min', level: 'Intermediate' },
      { time: '14:30', name: 'Cycle & Burn', trainer: 'Maya Chen', duration: '45 min', level: 'All Levels' },
    ],
    'Evening': [
      { time: '17:00', name: 'CrossFit Open', trainer: 'Alex Rivera', duration: '60 min', level: 'All Levels' },
      { time: '18:30', name: 'Strength Wars', trainer: 'Marcus Stone', duration: '75 min', level: 'Advanced' },
      { time: '20:00', name: 'Flex & Flow', trainer: 'Sofia Rodriguez', duration: '45 min', level: 'All Levels' },
    ],
  },
  'Thursday': {
    'Morning': [
      { time: '06:00', name: 'Metabolic Burn', trainer: 'Sarah Johnson', duration: '45 min', level: 'All Levels' },
      { time: '07:30', name: 'Power Training', trainer: 'Mike Thompson', duration: '60 min', level: 'Intermediate' },
      { time: '09:00', name: 'Gentle Flow', trainer: 'Emma Davis', duration: '60 min', level: 'Beginner' },
    ],
    'Afternoon': [
      { time: '12:00', name: 'Box & Burn', trainer: 'James Wilson', duration: '60 min', level: 'All Levels' },
      { time: '14:30', name: 'Core Power', trainer: 'Sofia Rodriguez', duration: '45 min', level: 'Intermediate' },
    ],
    'Evening': [
      { time: '17:00', name: 'CrossFit Skills', trainer: 'Alex Rivera', duration: '75 min', level: 'Intermediate' },
      { time: '18:30', name: 'HIIT Express', trainer: 'Maya Chen', duration: '30 min', level: 'All Levels' },
      { time: '20:00', name: 'Restorative Yoga', trainer: 'Emma Davis', duration: '60 min', level: 'All Levels' },
    ],
  },
  'Friday': {
    'Morning': [
      { time: '06:00', name: 'Sprint & Strength', trainer: 'Marcus Stone', duration: '45 min', level: 'Advanced' },
      { time: '07:30', name: 'Functional Fitness', trainer: 'Sarah Johnson', duration: '60 min', level: 'All Levels' },
      { time: '09:00', name: 'Power Flow', trainer: 'Emma Davis', duration: '75 min', level: 'Intermediate' },
    ],
    'Afternoon': [
      { time: '12:00', name: 'MMA Fitness', trainer: 'James Wilson', duration: '60 min', level: 'Intermediate' },
      { time: '14:30', name: 'Endurance Cycle', trainer: 'Maya Chen', duration: '60 min', level: 'All Levels' },
    ],
    'Evening': [
      { time: '17:00', name: 'CrossFit WOD', trainer: 'Alex Rivera', duration: '60 min', level: 'Advanced' },
      { time: '18:30', name: 'Ultimate HIIT', trainer: 'Sarah Johnson', duration: '45 min', level: 'All Levels' },
      { time: '20:00', name: 'Candlelight Yoga', trainer: 'Sofia Rodriguez', duration: '60 min', level: 'All Levels' },
    ],
  },
  'Saturday': {
    'Morning': [
      { time: '08:00', name: 'Weekend Warriors', trainer: 'Marcus Stone', duration: '90 min', level: 'Advanced' },
      { time: '09:30', name: 'Community Yoga', trainer: 'Emma Davis', duration: '75 min', level: 'All Levels' },
      { time: '11:00', name: 'Boxing Bootcamp', trainer: 'James Wilson', duration: '60 min', level: 'All Levels' },
    ],
    'Afternoon': [
      { time: '13:00', name: 'CrossFit Open Gym', trainer: 'Alex Rivera', duration: '120 min', level: 'All Levels' },
      { time: '15:00', name: 'Dance Fitness', trainer: 'Maya Chen', duration: '60 min', level: 'All Levels' },
    ],
    'Evening': [
      { time: '17:00', name: 'Sunset Flow', trainer: 'Sofia Rodriguez', duration: '60 min', level: 'All Levels' },
    ],
  },
  'Sunday': {
    'Morning': [
      { time: '09:00', name: 'Sunday Stretch', trainer: 'Emma Davis', duration: '60 min', level: 'All Levels' },
      { time: '10:30', name: 'Mobility & Flow', trainer: 'Sofia Rodriguez', duration: '75 min', level: 'All Levels' },
    ],
    'Afternoon': [
      { time: '12:00', name: 'Open Gym', trainer: 'Various Trainers', duration: '180 min', level: 'All Levels' },
    ],
    'Evening': [
      { time: '16:00', name: 'Meditation & Restore', trainer: 'Emma Davis', duration: '60 min', level: 'All Levels' },
    ],
  },
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const timeSlots = ['Morning', 'Afternoon', 'Evening']

const Schedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Monday')

  return (
    <>
      <Navbar />
      <main className="bg-blackPulse text-white min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <motion.div 
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1534258936925-c58bed479fcb')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-transparent opacity-75" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
          </motion.div>

          <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-[12vw] lg:text-[12rem] font-display leading-[0.8] tracking-tighter">
                CLASS
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orangePulse via-red-500 to-yellow-500 animate-gradient-x">
                  SCHEDULE
                </span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Schedule Section */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            {/* Day Selection */}
            <div className="flex overflow-x-auto space-x-4 mb-16 pb-4 scrollbar-hide">
              {daysOfWeek.map((day) => (
                <motion.button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-8 py-4 rounded-lg font-athletic text-lg whitespace-nowrap transition-all duration-300
                    ${selectedDay === day 
                      ? 'bg-gradient-to-r from-orangePulse to-red-500 text-white' 
                      : 'bg-black/30 text-greyPulse hover:bg-black/50'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {day}
                </motion.button>
              ))}
            </div>

            {/* Schedule Grid */}
            <div className="space-y-12">
              {timeSlots.map((slot) => (
                <motion.div
                  key={slot}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-display mb-6">{slot}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {weekSchedule[selectedDay]?.[slot]?.map((classItem, index) => (
                      <div
                        key={index}
                        className="bg-black/30 rounded-lg p-6 border border-white/5"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-display text-white">
                              {classItem.name}
                            </h3>
                            <p className="text-sm font-athletic text-greyPulse">{classItem.trainer}</p>
                          </div>
                          <span className="text-2xl font-display text-orangePulse">{classItem.time}</span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-athletic text-greyPulse">{classItem.duration}</span>
                          <span className="w-1 h-1 bg-orangePulse rounded-full" />
                          <span className="text-sm font-athletic text-greyPulse">{classItem.level}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orangePulse to-red-500 opacity-50"></div>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl lg:text-8xl font-display text-white mb-8">
                JOIN THE MOVEMENT
              </h2>
              <Link
                to="/membership"
                className="inline-block px-12 py-6 bg-blackPulse text-white text-xl font-athletic 
                         hover:bg-white hover:text-blackPulse transition-all duration-300"
              >
                START TODAY
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Schedule