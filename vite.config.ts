import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    // GSAP et Lenis sont chargés à la demande par des import() dynamiques.
    chunkSizeWarningLimit: 900,
  },
});
