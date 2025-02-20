/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      xs: '375px',
      sm: '480px',
      md: '768px',
      lg: '992px',
      xl: '1220px'
    },
    extend: {
      margin:{
        '128': '32rem',
        '60': '15rem',
        '90': '22.5rem',
        '120': '30rem',
        '150': '37.5rem',
        '180': '45rem',
        '210': '55rem',
        '240': '60rem',
        '270': '89rem',
      },
      width:{
        '128': '32rem',
        '60': '15rem',
        '90': '22.5rem',
        '120': '30rem',
        '150': '37.5rem',
        '180': '45rem',
        '210': '55rem',
        '240': '60rem',
        '270': '89rem',
      },
      height:{
        '128': '32rem',
        '60': '15rem',
        '90': '22.5rem',
        '120': '30rem',
        '150': '37.5rem',
        '180': '45rem',
        '210': '55rem',
        '240': '60rem',
        '270': '89rem',
      },     
       padding:{
        '128': '32rem',
        '60': '15rem',
        '90': '22.5rem',
        '120': '30rem',
        '150': '37.5rem',
        '180': '45rem',
        '210': '55rem',
        '240': '60rem',
        '270': '89rem',
      },
      colors:{
        // customized colors placed in this
        window: {
          700: "#7B0323"
        },
        some:{700: "#DB7A71"},
        orangee:{700: "#B377C9"},
        ore:{700: "#F42E3B"},
        green2:{200: "#48C067"},
        ore1:{700: "#540211"},
        ore2:{700: "#1F1F1F"},
      },
      spacing: {
        '1': '8px',
        '2': '102px',
        '3': '16px',
        '4': '24px',
        '5': '32px',
        '6': '48px',
      }
    },
  },
  plugins: [],
}