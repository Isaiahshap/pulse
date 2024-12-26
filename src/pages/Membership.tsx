import React, { useState, useCallback } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface PlanFeature {
  included: boolean
  feature: string
}

interface PlanPrice {
  readonly monthly: `${number}`
  readonly yearly: `${number}`
}

interface MembershipPlan {
  readonly name: string
  readonly price: PlanPrice
  readonly description: string
  readonly features: ReadonlyArray<PlanFeature>
  readonly highlight?: boolean
}

type PricingPeriod = 'monthly' | 'yearly'

const FAQ_DATA = [
  {
    q: "What's included in the membership?",
    a: "Each membership tier includes different benefits, from basic gym access to premium features like personal training and nutrition consultation. Check our membership plans above for detailed information."
  },
  {
    q: "Can I freeze my membership?",
    a: "Yes, you can freeze your membership for up to 3 months per year with a valid reason. Contact our support team for assistance."
  },
  {
    q: "Is there a joining fee?",
    a: "No, we don't charge any joining fees. You only pay for your chosen membership plan."
  },
  {
    q: "What's your cancellation policy?",
    a: "We offer a flexible month-to-month membership with 30-day notice for cancellation."
  }
] as const

const calculateYearlyPrice = (monthlyPrice: number): number => 
  Math.floor(monthlyPrice * 12 * 0.8) // 20% discount

const formatPrice = (price: number): string => 
  price.toLocaleString('en-US')

const membershipPlans: ReadonlyArray<MembershipPlan> = [
  {
    name: "Basic",
    price: {
      monthly: "49",
      yearly: "470",
    },
    description: "Perfect for beginners starting their fitness journey",
    features: [
      { included: true, feature: "Access to main gym area" },
      { included: true, feature: "Basic fitness assessment" },
      { included: true, feature: "2 group classes per month" },
      { included: false, feature: "Personal training sessions" },
      { included: false, feature: "Spa & recovery zones" },
      { included: false, feature: "Nutrition consultation" }
    ]
  },
  {
    name: "Elite",
    price: {
      monthly: "99",
      yearly: "900"
    },
    description: "Our most popular plan for dedicated fitness enthusiasts",
    features: [
      { included: true, feature: "Unlimited gym access" },
      { included: true, feature: "Advanced fitness assessment" },
      { included: true, feature: "Unlimited group classes" },
      { included: true, feature: "2 PT sessions per month" },
      { included: true, feature: "Spa & recovery zones" },
      { included: false, feature: "Nutrition consultation" }
    ],
    highlight: true
  },
  {
    name: "Ultimate",
    price: {
      monthly: "149",
      yearly: "1400"
    },
    description: "The complete package for maximum results",
    features: [
      { included: true, feature: "24/7 gym access" },
      { included: true, feature: "Monthly body composition" },
      { included: true, feature: "Unlimited group classes" },
      { included: true, feature: "4 PT sessions per month" },
      { included: true, feature: "Spa & recovery zones" },
      { included: true, feature: "Monthly nutrition plan" }
    ]
  }
]

const Membership: React.FC = () => {
  const [pricingPeriod, setPricingPeriod] = useState<PricingPeriod>('monthly')
  const [heroImageLoaded, setHeroImageLoaded] = useState(false)

  const calculateSavings = useCallback((plan: MembershipPlan) => {
    const monthlyTotal = parseInt(plan.price.monthly) * 12
    const yearlyPrice = parseInt(plan.price.yearly)
    return monthlyTotal - yearlyPrice
  }, [])

  return (
    <>
      <Navbar />
      <main className="bg-blackPulse text-white min-h-screen">
        <section 
          className={`relative h-[60vh] overflow-hidden pt-24 transition-opacity duration-500 ${
            heroImageLoaded ? 'opacity-100' : 'opacity-0'
          }`} 
          role="banner"
        >
          <motion.div 
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200')`,
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
                CHOOSE
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orangePulse via-red-500 to-yellow-500 animate-gradient-x">
                  YOUR PATH
                </span>
              </h1>
            </motion.div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200"
            alt=""
            className="hidden"
            onLoad={() => setHeroImageLoaded(true)}
          />
        </section>

        <div className="flex justify-center mb-12" role="group" aria-label="Pricing period selection">
          <div className="bg-zinc-900/50 p-2 rounded-lg flex items-center gap-4">
            {(['monthly', 'yearly'] as const).map((period) => (
              <button
                key={period}
                className={`px-4 py-2 rounded transition-all duration-300 ${
                  pricingPeriod === period 
                    ? 'bg-orangePulse text-white' 
                    : 'hover:bg-zinc-800'
                }`}
                onClick={() => setPricingPeriod(period)}
                aria-pressed={pricingPeriod === period}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
                {period === 'yearly' && (
                  <span className="ml-2 text-xs bg-green-500 px-2 py-1 rounded">
                    Save 20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <section className="py-24 relative" aria-label="Membership Plans">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {membershipPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative group ${
                    plan.highlight 
                      ? 'bg-gradient-to-b from-orangePulse to-red-500' 
                      : 'bg-zinc-900/50'
                  } rounded-lg overflow-hidden`}
                >
                  {plan.highlight && (
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
                  )}
                  
                  <div className={`p-8 ${plan.highlight ? 'relative' : ''}`}>
                    <h3 className="text-3xl font-display mb-2">{plan.name}</h3>
                    <p className="font-athletic text-greyPulse mb-6">{plan.description}</p>
                    
                    <div className="mb-8">
                      <span className="text-5xl font-display">
                        ${formatPrice(parseInt(plan.price[pricingPeriod]))}
                      </span>
                      <span className="text-greyPulse font-athletic">
                        /{pricingPeriod === 'yearly' ? 'year' : 'month'}
                      </span>
                      {pricingPeriod === 'yearly' && (
                        <div className="text-sm text-green-400 mt-2">
                          Save ${calculateSavings(plan)} per year
                        </div>
                      )}
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center
                            ${feature.included 
                              ? 'bg-orangePulse' 
                              : 'bg-zinc-800'}`}
                          >
                            {feature.included ? (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-3 h-3 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                          </span>
                          <span className={`font-athletic ${feature.included ? 'text-white' : 'text-greyPulse'}`}>
                            {feature.feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/contact"
                      className={`block text-center py-4 px-8 font-athletic uppercase tracking-wider transition-all duration-300
                        ${plan.highlight 
                          ? 'bg-blackPulse text-white hover:bg-white hover:text-blackPulse' 
                          : 'bg-gradient-to-r from-orangePulse to-red-500 text-white hover:from-white hover:to-white hover:text-blackPulse'
                        }`}
                    >
                      Get Started
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orangePulse via-red-500 to-black">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-[8vw] lg:text-8xl font-display leading-[0.8] mb-8">
                  TRANSFORM
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
                    YOUR LIFE
                  </span>
                </h2>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                    <p className="text-5xl font-display text-white mb-2">24/7</p>
                    <p className="font-athletic text-white/70">Access Available</p>
                  </div>
                  <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                    <p className="text-5xl font-display text-white mb-2">100+</p>
                    <p className="font-athletic text-white/70">Weekly Classes</p>
                  </div>
                </div>
                <p className="font-athletic text-xl text-white/90 leading-relaxed">
                  Join a community dedicated to pushing boundaries and achieving greatness. 
                  State-of-the-art facilities, expert guidance, and a motivating atmosphere 
                  await you at every corner.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200" 
                    alt="Training in action"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <motion.div 
                  className="absolute -bottom-8 -left-8 bg-blackPulse p-6 rounded-lg shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <p className="text-sm font-athletic text-greyPulse mb-2">Starting From</p>
                  <p className="text-4xl font-display text-white">$49/mo</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 relative bg-zinc-900/50" aria-label="Frequently Asked Questions">
          <div className="max-w-4xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-7xl font-display mb-16 text-center"
            >
              FAQ
            </motion.h2>
            <div className="space-y-4">
              {FAQ_DATA.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/20 backdrop-blur-sm p-8 rounded-lg border border-white/5"
                >
                  <h3 className="text-2xl font-display mb-3">{faq.q}</h3>
                  <p className="font-athletic text-greyPulse leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-32 overflow-hidden bg-gradient-to-br from-orangePulse to-red-500">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
          
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[12vw] lg:text-9xl font-display text-white mb-8 leading-[0.8]">
                START NOW
              </h2>
              <Link
                to="/contact"
                className="inline-block px-12 py-6 bg-blackPulse text-white text-xl font-athletic 
                         hover:bg-white hover:text-blackPulse transition-all duration-300
                         border border-transparent hover:border-blackPulse"
              >
                CONTACT US
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Membership 