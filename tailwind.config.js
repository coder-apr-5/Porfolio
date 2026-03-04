/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                darkGreen: "#0a1a0f",
                neonGreen: "#39ff14",
                sageGreen: "#789e7a"
            },
            fontFamily: {
                heading: ['"Press Start 2P"', 'cursive'],
                body: ['"VT323"', 'monospace']
            },
            boxShadow: {
                neon: "0 0 5px theme('colors.neonGreen'), 0 0 20px theme('colors.neonGreen')",
                'neon-strong': "0 0 10px theme('colors.neonGreen'), 0 0 40px theme('colors.neonGreen')"
            }
        },
    },
    plugins: [],
}
