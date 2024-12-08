/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            height: {
                '80vh': '80vh',
                '40vh': '40vh'
            },
            colors:{
                'primary':'#4C6983',
                'secondary':'#38556A',
                'tertiary':'#273952',
                'quaternary':'#4a738d',
                'quinary':'#5f8ba3',
            }
        },
    },
    plugins: [],
};
