const { keyframes } = require('framer-motion');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Para Pages Router
    './components/**/*.{js,ts,jsx,tsx,mdx}', // ¡Importante para tus componentes y UI de Shadcn!
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Para App Router
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Si usas carpeta src
    ], 
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "15px", 
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '960px',
            xl: '1200px',
        },
        fontFamily: {
            primary: "var(--font-jetbrainsMono)"
        },
        extend: {
            colors:{
                primary: '#0C0C2C',
                accent: {
                    DEFAULT: '#00C6FF', // Usado con clases como bg-accent, text-accent
                    hover: '#00C6FF',   // Usado explícitamente o en plugins/componentes
                }
            },
            typography: {
                DEFAULT: {
                    css: {
                        p: {
                            marginTop: '1.5em',
                            marginBottom: '1.5em',
                        },
                    },
                },
            },
            // Puedes añadir otras extensiones aquí (keyframes, animation, etc.)
            // keyframes: { ... },
            // animation: { ... },
            animation: {
                'in': 'fadeIn 0.3s ease-out',
                'out': 'fadeOut 0.3s ease-in',
                'slide-in-from-right': 'slide-in-from-right 0.5s ease-out forwards',
                'slide-out-to-right': 'slide-out-to-right 0.3s ease-in forwards',            
                'slide-in-from-left': 'slide-in-from-left 0.5s ease-out forwards',
                'slide-out-to-left': 'slide-out-to-left 0.3s ease-in forwards',
                'slide-in-from-top': 'slide-in-from-top 0.5s ease-out forwards',
                'slide-out-to-top': 'slide-out-to-top 0.3s ease-in forwards',
                'slide-in-from-bottom': 'slide-in-from-bottom 0.5s ease-out forwards',
                'slide-out-to-bottom': 'slide-out-to-bottom 0.3s ease-in forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                fadeOut: {
                    '0%': { opacity: 1 },
                    '100%': { opacity: 0 },
                },
                'slide-in-from-right': {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                'slide-out-to-right': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                'slide-in-from-left': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                'slide-in-from-top': {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                'slide-out-to-top': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-100%)' },
                },
                'slide-in-from-bottom': {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                'slide-out-to-bottom': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(100%)' },
                },
            }
        },
    },
    plugins: [
        // Añade plugins aquí si los necesitas, ej:
        // require('@tailwindcss/typography'),
        // require('@tailwindcss/forms'),
        [require("tailwindcss-animate")],
        [require('@tailwindcss/typography')],
        [require('@tailwindcss/line-clamp')],
    ],
}