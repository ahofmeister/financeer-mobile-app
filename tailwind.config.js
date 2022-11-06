/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: {
            primary: '#00C9C9',
            secondary: '#191A1C',
            accent: '#F06071',
            neutral: '#101112',
            white: '#FFFFFF',
            gray: '#A4A4A5'
        },
        extend: {
            gradientColorStops: theme => ({
                primary: '#00C9C9',
                accent: '#F06071',
            }),
        }
    },
    plugins: []
}
