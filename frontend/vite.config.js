import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,         // 👈 allows access from mobile
    port: 5173,          // 👈 can change if needed
    strictPort: true     // 👈 forces port to stay the same
  }
})