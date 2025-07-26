#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Configuration de l\'environnement de développement local\n');

// Vérifier si .env existe déjà
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (fs.existsSync(envPath)) {
  console.log('✅ Le fichier .env existe déjà');
} else {
  if (fs.existsSync(envExamplePath)) {
    // Copier .env.example vers .env
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Fichier .env créé à partir de .env.example');
  } else {
    // Créer un .env basique
    const envContent = `# Variables d'environnement pour le développement local
# NE PAS COMMITER CE FICHIER !

# Clé API Groq (à obtenir sur https://console.groq.com/)
VITE_GROQ_API_KEY=your_groq_api_key_here

# Configuration de développement
NODE_ENV=development
VITE_APP_ENV=development
`;
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Fichier .env créé');
  }
}

console.log('\n📋 Prochaines étapes :');
console.log('1. 🔑 Obtenez votre clé API Groq sur https://console.groq.com/');
console.log('2. ✏️  Éditez le fichier .env et remplacez "your_groq_api_key_here" par votre vraie clé');
console.log('3. 🚀 Lancez le serveur de développement avec : npm run dev');
console.log('\n⚠️  IMPORTANT : Ne commitez JAMAIS le fichier .env !');
console.log('   Il est déjà dans .gitignore pour votre sécurité.\n');