// @type {import('tailwindcss').Config}
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    screens: {
      'sm': { 'max': '767px' },
      // => @media (max-width: 767px) { ... }

      'md': { 'min': '768px', 'max': '991px' },
      // => @media (min-width: 768px) and (max-width: 991px) { ... }

      'lg': { 'min': '992px', 'max': '1200px' },
      // => @media (min-width: 992px) and (max-width: 1200px) { ... }

      'xl': { 'min': '1201px', 'max': '1400px' },
      // => @media (min-width: 1201px) and (max-width: 1400px) { ... }

      'mdMax': '768px',
      // => @media (min-width: 768px) { ... }

      'xxl': { 'min': '1401px', 'max': '1600px' },
      // => @media (min-width: 1401px) and (max-width: 1600px) { ... }

      'xxxl': { 'min': '1601px', 'max': '1920px' },
      // => @media (min-width: 1401px) and (max-width: 1600px) { ... }
    },
    container: {
      center: true,
      padding: '15px',
    },
    fontFamily: {
      'primary': ["'Nunito Sans', sans-serif"],
      'fontawesome': ["Font Awesome 5 Pro"],
    },
    extend: {
      colors: {
        black: {
          light: '#03061C',
          lightTwo: '#454751',
          DEFAULT: '#0D0F19',
        },
        white: '#ffffff',
        gray: {
          light: '#f9f9f9',
          lightTwo: '#9B9FA7',
          DEFAULT: '#616161',
          dark: '#EEF3FF',
          border: '#ebebeb',
          borderTwo: '#C1C9D9',
          borderThree: '#EFF0F2',
          borderFour: '#E6E8EE',
          borderFive: '#C1D5FE',
          borderSix: '#E4E6E9',
          borderSeven: '#E5E8EC',
          borderEight: '#ECEEF1',
          bg: '#fcfcfc',
          bgTwo: '#F8FAFF',
          bgThree: '#F4F5F8',
          bgFour: '#F5F7FB',
          bgFive: '#a8a8a8',
        },
        red: {
          light: '#FA5769',
          DEFAULT: '#FF5066',
          dark: '#D41E1E',
        },
        orange: {
          light: '#FF9720',
          DEFAULT: '#FF9720',
          dark: '#FF9720',
        },
        yellow: {
          light: '#FF9720',
        },
        green: {
          light: '#5BC5A8',
          lightTwo: '#27DB8D',
          DEFAULT: '#32C98D',
        },
        primary: {
          DEFAULT: '#2C6AE5',
        },
        accent: {
          DEFAULT: '#32C98D',
        },
        warn: {
          light: '#DF7272',
          DEFAULT: '#FF9720',
          dark: '#E2790F',
        },
        teal: {
          light: '#866AD4',
          DEFAULT: '#611BCB',
        },
        blue: {
          light: '#235ED2',
          lightTwo: '#6692E9',
          DEFAULT: '#2C6AE5',
          dark: '#ffffff',
        },
      },
    },
  },
  plugins: [],
}
