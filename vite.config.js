import { defineConfig } from 'vite'
import { copyFileSync, existsSync } from 'fs'
import { resolve } from 'path'

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
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        quiz: resolve(__dirname, 'quiz.html')
      }
    }
  },
  
  // Configuration du serveur de développement
  server: {
    port: 3000,
    open: true,
  },
  
  // Configuration pour la production
  preview: {
    port: 4173,
  },
  
  // Plugin pour copier les fichiers statiques
  plugins: [
    {
      name: 'copy-static-files',
      writeBundle() {
        // Copier les fichiers statiques nécessaires
        const filesToCopy = [
          'menu.html',
          'questions.json',
          'quiz.json',
          'config.js'
        ];
        
        filesToCopy.forEach(file => {
          if (existsSync(file)) {
            copyFileSync(file, `dist/${file}`);
            console.log(`✓ Copied ${file} to dist/`);
          }
        });
      }
    }
  ]
})