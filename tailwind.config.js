/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"Segoe UI",
					"Helvetica Neue",
					"Helvetica",
					"Lucida Grande",
					"Arial",
					"Ubuntu",
					"Cantarell",
					"Fira Sans",
					"sans-serif",
				],
			},
		},
	},
	plugins: [],
};
