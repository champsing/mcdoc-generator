/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			height: {
				'80vh': '80vh',
				'40vh': '40vh',
			},
			colors: {
                background: '#27272a',
				primary: '#447766',
				secondary: '#335566',
				tertiary: '#555555',
			},
            borderColor:{
                primary: '#66DD99',
                secondary: '#3388AA',
                tertiary: '#888888',
            }
		},
	},
	plugins: [],
};
