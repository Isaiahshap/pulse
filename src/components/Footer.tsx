import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="bg-blackPulse text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display text-orangePulse">Pulse Gym</h3>
            <p className="font-athletic text-xl text-greyPulse tracking-wide">
              Empowering your fitness journey with state-of-the-art facilities and expert guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/classes" className="font-athletic text-lg text-greyPulse hover:text-orangePulse transition-colors">Classes</Link></li>
              <li><Link to="/trainers" className="font-athletic text-lg text-greyPulse hover:text-orangePulse transition-colors">Trainers</Link></li>
              <li><Link to="/membership" className="font-athletic text-lg text-greyPulse hover:text-orangePulse transition-colors">Membership</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-display mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="font-athletic text-lg text-greyPulse">123 Fitness Street</li>
              <li className="font-athletic text-lg text-greyPulse">New York, NY 10001</li>
              <li className="font-athletic text-lg text-greyPulse">Phone: (555) 123-4567</li>
              <li className="font-athletic text-lg text-greyPulse">Email: info@pulsegym.com</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-display mb-4">Hours</h4>
            <ul className="space-y-2">
              <li className="font-athletic text-lg text-greyPulse">Monday - Friday: 5am - 10pm</li>
              <li className="font-athletic text-lg text-greyPulse">Saturday: 7am - 8pm</li>
              <li className="font-athletic text-lg text-greyPulse">Sunday: 8am - 6pm</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="font-athletic text-lg text-greyPulse">&copy; {new Date().getFullYear()} Pulse Gym. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 