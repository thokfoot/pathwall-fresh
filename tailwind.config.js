/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'dark-bg': '#0a0a0a',
                'dark-card': '#1a1a1a',
                'accent': '#6366f1',
                'accent-hover': '#818cf8'
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'sway': 'sway 8s ease-in-out infinite'
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' }
                },
                sway: {
                    '0%, 100%': { transform: 'translateX(0px) rotate(0deg)' },
                    '50%': { transform: 'translateX(10px) rotate(1deg)' }
                }
            }
        },
    },
    plugins: [],
}
