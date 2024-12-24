import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'

// Lazy load your pages
const Home = React.lazy(() => import('./pages/Home'))
const Classes = React.lazy(() => import('./pages/Classes'))

const LoadingFallback = () => (
  <div className="min-h-screen bg-blackPulse flex items-center justify-center">
    <div className="text-white text-2xl font-athletic">Loading...</div>
  </div>
)

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <div className="min-h-screen flex flex-col bg-blackPulse">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/classes" element={<Classes />} />
          </Routes>
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
