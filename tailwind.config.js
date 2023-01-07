/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                income: '#00C9C9',
                expense: '#e91e63',
                primary: '#C74200',
                neutral: '#101112',
                white: '#FFFFFF',
                gray: '#343333',
            },
            borderWidth: {
                1: 1
            }
        }
    },
    plugins: []
}
