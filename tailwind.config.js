/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                income: '#84F5F5',
                expense: '#F58484',
                primary: '#C74200',
                neutral: '#101112',
                white: '#FFFFFF',
                gray: '#18181B',
            },
        }
    },
    plugins: []
}
