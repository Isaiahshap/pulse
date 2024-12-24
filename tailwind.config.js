/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blackPulse: '#121212',
        orangePulse: '#FF5F1F',
        greyPulse: '#d3d3d3'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif'],
        athletic: ['Oswald', 'sans-serif'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'text-flicker': 'textFlicker 3s linear infinite',
        'gradient': 'gradient 3s ease infinite',
        'fade-in': 'fadeIn 1s ease-out',
        'scale': 'scale 0.3s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        textFlicker: {
          '0%, 100%': { textShadow: '0 0 4px rgba(255,255,255,0.1)' },
          '50%': { textShadow: '0 0 20px rgba(255,95,31,0.5)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scale: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}