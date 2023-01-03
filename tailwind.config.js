/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                income: '#00C9C9',
                expense: '#C7003F',
                primary: '#C74200',
                neutral: '#101112',
                white: '#FFFFFF',
                gray: '#343333',
            }
        }
    },
    plugins: []
}
