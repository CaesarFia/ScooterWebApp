/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  purge: ['./src/**/*.svelte', './public/app.html'],
  theme: {
    extend: {
      colors: {
        'background': '#50735a',
        'sidebar-dark-primary': '#02ffb20d',
        'sidebar-dark-secondary': '#2c3e50',
        'sidebar-light-primary': '#f5f6fa',
        'sidebar-light-secondary': '#8392a5',
        'charcoal': '#34495E',
        'tc': '#8392a5',
      },
      backdropBlur: {
        ms: '12px',
        xl: '20px',
      }
    },
  },
  variants: {
    extend: {
      opacity: ['group-hover'],
    },
  },
  plugins: [],
}

