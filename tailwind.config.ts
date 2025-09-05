import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Noto Sans JP', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'ui-serif', 'Georgia', 'serif'],
        'serif': ['Noto Serif JP', 'ui-serif', 'Georgia', 'serif'],
        'round': ['Hiragino Maru Gothic ProN', 'Yu Gothic', 'Meiryo', 'sans-serif'],
        'playfair': ['Playfair Display', 'ui-serif', 'Georgia', 'serif'],
        'noto': ['Noto Sans JP', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'mplus': ['M PLUS Rounded 1c', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'inter': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'poppins': ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'nunito': ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'accent': {
          'yellow': '#FFB703',
          'teal': '#00D1B2',
        },
        'bg': {
          'dark': '#0b1116',
          'darker': '#102030',
        },
        // Chinatown Theme
        'chinatown': {
          base: '#B71C1C',
          accent: '#D4AF37',
          light: '#FFCDD2',
          dark: '#8E0000'
        },
        // Little India Theme
        'india': {
          base: '#7B1FA2',
          accent: '#FBC02D',
          light: '#E1BEE7',
          dark: '#4A148C'
        },
        // Arab Street Theme
        'arab': {
          base: '#0D47A1',
          accent: '#C8AD7F',
          light: '#BBDEFB',
          dark: '#002171'
        },
        // Bugis Theme
        'bugis': {
          base: '#AD1457',
          accent: '#F06292',
          light: '#F8BBD9',
          dark: '#880E4F'
        },
        // Botanic Theme
        'botanic': {
          base: '#1B5E20',
          accent: '#A5D6A7',
          light: '#C8E6C9',
          dark: '#0D4F14'
        },
        // Clarke Quay Theme
        'clarke': {
          base: '#0EA5E9',
          accent: '#38BDF8',
          light: '#BAE6FD',
          dark: '#0369A1'
        },
        // Summer Theme
        'summer': {
          sky: '#87CEEB',
          ocean: '#4682B4',
          sunset: '#FFD580',
          coral: '#FF7F50',
          palm: '#228B22',
          sand: '#F4A460',
        }
      },
      backgroundImage: {
        'noise': "url('/textures/noise.png')",
      },
      letterSpacing: {
        'tight': '-0.02em',
        'tighter': '-0.04em'
      },
      animation: {
        'morph': 'morph 0.5s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        morph: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.1) rotate(5deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' }
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' }
        }
      }
    },
  },
  plugins: [],
};

export default config;
