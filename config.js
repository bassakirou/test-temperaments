// Configuration de l'API Groq pour l'analyse IA
// La clé API est maintenant gérée via les variables d'environnement Vercel
// Pour configurer : Vercel Dashboard > Project > Settings > Environment Variables
// Nom de la variable : VITE_GROQ_API_KEY
// Valeur : votre clé API Groq (commence par )

const CONFIG = {
  // Clé API Groq (sécurisée via variables d'environnement)
  GROQ_API_KEY: '',

  // Modèle IA à utiliser
  AI_MODEL: "llama-3.1-8b-instant", // Modèle rapide et gratuit

  // Paramètres de l'analyse
  ANALYSIS_SETTINGS: {
    temperature: 0.7,
    max_tokens: 1000,
    enabled: true, // Mettre à false pour désactiver l'analyse IA
  },
};

// Initialiser la clé API selon l'environnement
(() => {
  try {
    // Pour Vite en production (Vercel)
    if (typeof import !== 'undefined' && import.meta && import.meta.env) {
      CONFIG.GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
    }
    // Fallback pour Node.js
    else if (typeof process !== 'undefined' && process.env) {
      CONFIG.GROQ_API_KEY = process.env.VITE_GROQ_API_KEY || '';
    }
  } catch (error) {
    console.warn('Erreur lors de l\'accès aux variables d\'environnement:', error);
  }
})();

// Vérifier si la clé API est configurée
CONFIG.isConfigured = () => {
  return (
    CONFIG.GROQ_API_KEY &&
    CONFIG.GROQ_API_KEY.startsWith("") &&
    CONFIG.GROQ_API_KEY.trim().length > 20
  );
};

// Exporter la configuration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
