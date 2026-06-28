/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ch: {
          yellow: '#F5C518',
          amber: '#F59B42',
          green: '#34C77B',
          red: '#F56B6B',
          blue: '#4A90D9',
          bg: '#F7F6F2',
          card: '#FFFFFF',
          text: '#1A1A1A',
          muted: '#8A8A8A',
          border: '#EBEBEB',
          chat: '#F0EFE9',
        }
      },
    },
  },
  plugins: [],
}

