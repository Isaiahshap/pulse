import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="bg-blackPulse text-white min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[40vh] overflow-hidden pt-24">
          <motion.div 
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-transparent opacity-75" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
          </motion.div>

          <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-7xl font-display"
            >
              Privacy Policy<span className="text-orangePulse">.</span>
            </motion.h1>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-zinc-900/50 p-8 rounded-lg border border-white/5"
            >
              <div className="space-y-8">
                <div className="p-6 bg-red-500/10 rounded-lg border border-red-500/20">
                  <h2 className="text-2xl font-display mb-4">⚡ Demo Site Disclaimer</h2>
                  <p className="font-athletic text-greyPulse leading-relaxed">
                    This is a demo website created as part of a 7-day web development challenge (Day 3). 
                    Built from scratch using React TypeScript and Tailwind CSS by Yeshaya Shapiro.
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="font-athletic text-greyPulse">
                      🌐 Portfolio: <a href="https://yeshaya.dev" className="text-orangePulse hover:text-white transition-colors">yeshaya.dev</a>
                    </p>
                    <p className="font-athletic text-greyPulse">
                      📧 Contact: <a href="mailto:yeshaya@yeshaya.dev" className="text-orangePulse hover:text-white transition-colors">yeshaya@yeshaya.dev</a>
                    </p>
                  </div>
                </div>

                <h2 className="text-3xl font-display">Demo Privacy Policy</h2>
                <p className="font-athletic text-greyPulse leading-relaxed">
                  This is a demonstration website. No real user data is collected or stored. 
                  In a real implementation, this section would contain detailed information about data collection, 
                  usage, and protection practices.
                </p>

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 bg-black/20 rounded-lg"
                  >
                    <h3 className="text-xl font-display mb-3">Demo Purposes Only</h3>
                    <p className="font-athletic text-greyPulse">
                      This privacy policy is for demonstration purposes only. No actual data collection or processing occurs on this site.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default PrivacyPolicy