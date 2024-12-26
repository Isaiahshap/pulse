import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import ScrollToTop from './components/ScrollToTop'

// Lazy load your pages
const Home = React.lazy(() => import('./pages/Home'))
const Classes = React.lazy(() => import('./pages/Classes'))
const Trainers = React.lazy(() => import('./pages/Trainers'))
const Contact = React.lazy(() => import('./pages/Contact'))
const Membership = React.lazy(() => import('./pages/Membership'))
const Schedule = React.lazy(() => import('./pages/Schedule'))

const LoadingFallback = () => (
  <div className="min-h-screen bg-blackPulse flex items-center justify-center">
    <div className="text-white text-2xl font-athletic">Loading...</div>
  </div>
)

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <div className="min-h-screen flex flex-col bg-blackPulse">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
