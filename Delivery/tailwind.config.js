/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        // Vercel 빌드 시 dt: 브레이크포인트를 인식하도록 등록!
        dt: '1024px',
      },
    },
  },
  plugins: [],
};
