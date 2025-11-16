/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        body: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        heading: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#e6f7f4',
          100: '#b3e8e0',
          200: '#80d9cc',
          300: '#4dcab8',
          400: '#1abba4',
          500: '#00947c',
          600: '#007663',
          700: '#00584a',
          800: '#003a31',
          900: '#001c18',
        },
        secondary: {
          DEFAULT: '#f59e0b', // Orange/Amber
          light: '#fbbf24',
          dark: '#d97706',
        },
        accent: {
          DEFAULT: '#86efac', // Light Pastel Green
          dark: '#4ade80',
        },
        success: {
          DEFAULT: '#22c55e', // Pastel Green
          light: '#4ade80',
          dark: '#16a34a',
        },
      },
    },
  },
  plugins: [],
}

