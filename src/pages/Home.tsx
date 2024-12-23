import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="bg-blackPulse text-white">
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-6xl font-display text-orangePulse mb-8">
            Welcome to Pulse
          </h2>
          <p className="font-athletic text-2xl text-greyPulse leading-relaxed mb-4 tracking-wide">
            Unlock the power of your body and mind in our state-of-the-art facility,
            where world-class trainers and top-tier equipment meet a vibrant community
            of fitness enthusiasts.
          </p>
          <p className="font-athletic text-2xl text-greyPulse leading-relaxed tracking-wide">
            Whether you're a seasoned athlete or a complete beginner, our 
            classes cater to all fitness levels, ensuring that everyone has 
            the opportunity to discover their true potential.
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home 