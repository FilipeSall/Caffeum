import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    'import.meta.env.VITE_WEATHER_API_KEY':JSON.stringify(''),
    'import.meta.env.VITE_YOUTUBE_API_KEY':JSON.stringify('')
}
})

