import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Mock data for features
const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    ),
    title: "Elite Training",
    description: "State-of-the-art equipment and personalized coaching for maximum results"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Expert Coaches",
    description: "World-class trainers dedicated to your fitness journey"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Luxury Amenities",
    description: "Premium facilities including spa, sauna, and recovery zones"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Community",
    description: "Join a motivated community of fitness enthusiasts"
  }
]

// Mock data for testimonials
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Professional Athlete",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    quote: "Pulse has transformed my training regimen. The facilities and coaches are world-class."
  },
  {
    name: "Michael Chen",
    role: "Business Executive",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    quote: "The flexible schedule and premium equipment make it perfect for my busy lifestyle."
  },
  {
    name: "Emma Williams",
    role: "Fitness Enthusiast",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    quote: "The community here is incredible. I've never felt more motivated to achieve my goals."
  }
]

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      
      {/* Welcome Section (Existing) */}
      <main className="bg-blackPulse text-white">
        <section className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-7xl md:text-8xl font-display text-transparent bg-clip-text bg-gradient-to-r from-orangePulse via-red-500 to-yellow-500 animate-gradient-x mb-8">
              ELEVATE YOUR GAME
            </h2>
            <div className="space-y-4">
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="font-athletic text-3xl text-greyPulse leading-tight tracking-wide"
              >
                UNLEASH YOUR POTENTIAL IN OUR
                <span className="text-orangePulse"> CUTTING-EDGE </span>
                FACILITY
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="font-athletic text-2xl text-greyPulse leading-tight tracking-wide"
              >
                WHERE CHAMPIONS ARE MADE 24/7
              </motion.p>
            </div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="bg-gradient-to-b from-black/50 to-transparent py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="bg-black/30 p-8 rounded-lg border border-white/5 hover:border-orangePulse/30 transition-all duration-300"
                >
                  <motion.div 
                    className="text-orangePulse mb-4"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-3xl font-display text-white mb-3">
                    {feature.title}
                    <span className="text-orangePulse">.</span>
                  </h3>
                  <p className="font-athletic text-lg text-greyPulse">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Class Preview Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534258936925-c58bed479fcb')] bg-cover bg-center opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-display mb-4">Featured Classes</h2>
              <p className="font-athletic text-2xl text-greyPulse">Experience the intensity of our signature workouts</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'HIIT Fusion',
                  image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1200',
                },
                {
                  name: 'Power Lifting',
                  image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200',
                },
                {
                  name: 'Boxing',
                  image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200',
                }
              ].map((classItem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer"
                  style={{
                    backgroundImage: `url('${classItem.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-3xl font-display text-white mb-2">{classItem.name}</h3>
                    <Link
                      to="/classes"
                      className="inline-block bg-orangePulse text-white px-6 py-2 font-athletic uppercase tracking-wider hover:bg-white hover:text-orangePulse transition-all duration-300"
                    >
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gradient-to-b from-transparent to-black/50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-6xl font-display text-center mb-16">
              Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/30 p-8 rounded-lg relative"
                >
                  <div className="mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <p className="font-athletic text-xl text-greyPulse mb-4">"{testimonial.quote}"</p>
                    <h4 className="text-xl font-display text-orangePulse">{testimonial.name}</h4>
                    <p className="font-athletic text-greyPulse">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orangePulse to-red-500 opacity-50"></div>
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                className="text-7xl md:text-9xl font-display uppercase mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  START
                </motion.span>{" "}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-black to-black/80"
                >
                  YOUR LEGACY
                </motion.span>
              </motion.h2>
              <motion.div
                className="flex flex-wrap justify-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Link
                  to="/membership"
                  className="bg-black text-white px-12 py-4 text-xl font-athletic uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
                >
                  Join Now
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-black text-black px-12 py-4 text-xl font-athletic uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home 