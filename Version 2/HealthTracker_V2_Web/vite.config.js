import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Todas las solicitudes que comiencen con '/api' serán redirigidas
      '/api': {
        target: 'https://carinosaapi.onrender.com', // La URL base de tu API
        changeOrigin: true, // Necesario para evitar problemas de CORS
        rewrite: (path) => path.replace(/^\/api/, '') // Opcional: reescribe las URLs de las solicitudes
      },
    },
  },
});