import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api-ecommers-1buh.onrender.com/api',
        secure:false,
        changeOrigin: true,
        }
    }
  }
});
