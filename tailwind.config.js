/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
		fontFamily: {
			Title: ['Play', 'sans-serif']
		}
	},
  },
  plugins: [],
}

