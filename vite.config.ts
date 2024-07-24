import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    'import.meta.env.VITE_WEATHER_API_KEY':JSON.stringify('c55bb6fb08629a41d85df069e0ff191c'),
    'import.meta.env.VITE_YOUTUBE_API_KEY':JSON.stringify('AIzaSyACz5f4WgyhA0OwEhxA4dLQwtKzwReLEB4')
}
})

