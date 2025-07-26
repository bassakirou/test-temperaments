import { defineConfig } from 'vite'

export default defineConfig({
  // Configuration pour les variables d'environnement
  define: {
    // Injecter la variable d'environnement au build
    'process.env.VITE_GROQ_API_KEY': JSON.stringify(process.env.VITE_GROQ_API_KEY || ''),
  },
  
  // Configuration du build
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
  },
  
  // Configuration du serveur de développement
  server: {
    port: 3000,
    open: true,
  },
  
  // Configuration pour la production
  preview: {
    port: 4173,
  }
})