import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface FormData {
  name: string
  email: string
  phone: string
  message: string
  subject: string
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: 'general'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  return (
    <>
      <Navbar />
      <main className="bg-blackPulse text-white min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden pt-24">
          <motion.div 
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-transparent opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
          </motion.div>

          <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0, 1] }}
              className="max-w-4xl"
            >
              <h1 className="text-[12vw] lg:text-[12rem] font-display leading-[0.8] tracking-tighter">
                GET IN
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orangePulse via-red-500 to-yellow-500 animate-gradient-x">
                  TOUCH
                </span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-display mb-8">Let's Connect</h2>
                <p className="font-athletic text-xl text-greyPulse mb-12">
                  Ready to transform your fitness journey? Our team is here to answer 
                  your questions and help you get started.
                </p>

                <div className="space-y-8">
                  {/* Location */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-orangePulse/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-orangePulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-display mb-2">Location</h3>
                      <p className="font-athletic text-greyPulse">123 Fitness Street</p>
                      <p className="font-athletic text-greyPulse">New York, NY 10001</p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-orangePulse/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-orangePulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-display mb-2">Contact</h3>
                      <p className="font-athletic text-greyPulse">Phone: (555) 123-4567</p>
                      <p className="font-athletic text-greyPulse">Email: info@pulsegym.com</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-orangePulse/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-orangePulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-display mb-2">Hours</h3>
                      <p className="font-athletic text-greyPulse">Monday - Friday: 5am - 10pm</p>
                      <p className="font-athletic text-greyPulse">Saturday: 7am - 8pm</p>
                      <p className="font-athletic text-greyPulse">Sunday: 8am - 6pm</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-zinc-900/50 p-8 rounded-lg"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block font-athletic text-sm mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 font-athletic 
                                 text-white focus:outline-none focus:border-orangePulse transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-athletic text-sm mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 font-athletic 
                                 text-white focus:outline-none focus:border-orangePulse transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-athletic text-sm mb-2">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 font-athletic 
                               text-white focus:outline-none focus:border-orangePulse transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-athletic text-sm mb-2">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 font-athletic 
                               text-white focus:outline-none focus:border-orangePulse transition-colors"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="membership">Membership</option>
                      <option value="training">Personal Training</option>
                      <option value="classes">Group Classes</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-athletic text-sm mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 font-athletic 
                               text-white focus:outline-none focus:border-orangePulse transition-colors"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orangePulse to-red-500 text-white py-4 px-8 
                             rounded font-athletic uppercase tracking-wider hover:from-white hover:to-white 
                             hover:text-orangePulse transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="aspect-[21/9] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25280999342!2d-74.11976389828428!3d40.697403441436425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1679436374500!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Contact 