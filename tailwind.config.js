/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        'playfair-display': ['Playfair Display', 'serif']
      },
      colors: {
        landing: {
          dark: '#131A1B',
          'dark-secondary': '#203B40',
          light: '#E7F3F3',
          'light-secondary': '#FFFFFF',
          brand: '#CBF36E',
          'brand-secondary': '#276E6E'
        }
      }
    }
  },
  plugins: [],
  darkMode: 'class'
}
