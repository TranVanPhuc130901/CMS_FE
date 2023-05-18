/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            boxShadow: {
                'hd': '0 1px 15px rgba(0,0,0,.1), 0 1px 8px rgba(0,0,0,.1)',
                'menu': '0 3px 30px rgba(0,0,0,.3), 0 3px 24px rgba(0,0,0,.3)',
                'tb': '0 1px 15px rgba(0,0,0,.1), 0 1px 8px rgba(0,0,0,.1)',
                'ct': '0 1px 15px rgba(0,0,0,.1), 0 1px 8px rgba(0,0,0,.1)'
            }
        },
    },
    plugins: [],
}