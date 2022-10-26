/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: {
            transparent: '#FF00FF',
            black: '##FF00FF',
            white: '#fff',
            gray: {
                100: '#f7fafc',
                // ...
                900: '#1a202c',
            },
        },
    },
    plugins: []
}
