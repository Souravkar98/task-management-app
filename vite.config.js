import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://10000--main--fastapi--admin.dev.storewise.in',  // Your API endpoint
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,  // Set to false if the API uses self-signed certificates
      },
    },
  },
})
