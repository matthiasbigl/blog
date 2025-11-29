module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // User Palette: ["#474448","#2d232e","#e0ddcf","#534b52","#f1f0ea"]
        dark: {
          bg: '#1a161b',      // Much Darker Background (Deep Purple/Black)
          card: '#2d232e',    // Keep original bg as card color for contrast
          text: '#f1f0ea',    // Main Text on Dark
          muted: '#e0ddcf',   // Secondary/Muted Text
          border: '#534b52',  // Borders
        },
        light: {
          bg: '#ffffff',      // Main Light Background
          card: '#f9fafb',    // Light Card Background
          text: '#1f2937',    // Main Text on Light
          muted: '#6b7280',   // Muted Text
          border: '#e5e7eb',  // Borders
        },
        primary: '#534b52',   // Primary Brand Color (from user palette)
        accent: '#e0ddcf',    // Accent Color
      },
      extend: {
        textShadow: {
          sm: '0 1px 2px var(--tw-shadow-color)',
          DEFAULT: '0 2px 4px var(--tw-shadow-color)',
          lg: '0 8px 16px var(--tw-shadow-color)',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        serif: ['"Lora"', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
