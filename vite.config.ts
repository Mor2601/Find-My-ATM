import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://data.gov.il',
        changeOrigin: true,
        // Maintain the full path, do not rewrite
        rewrite: (path) => path, // Keep the original path
      },
    },
  },
});
