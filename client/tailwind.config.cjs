/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				bg1: "rgb(2, 3, 20)",
			},
			fontFamily: {
				"head": ["Oswald", "sans-serif"],
				"body": ["Inter", "sans-serif"],
			},
		},
	},
	plugins: [],
}
