// Configuration de l'API Groq pour l'analyse IA
// SÉCURISÉ : Aucune clé API n'est stockée dans ce fichier !
//
// Pour le développement local :
// 1. Copiez .env.example vers .env
// 2. Ajoutez votre clé API Groq dans .env
//
// Pour la production (Vercel) :
// 1. Configurez VITE_GROQ_API_KEY dans Vercel Dashboard
// 2. Project Settings > Environment Variables

const CONFIG = {
  // Clé API Groq (sera chargée depuis les variables d'environnement)
  GROQ_API_KEY: "",

  // Modèle IA à utiliser
  AI_MODEL: "llama-3.1-8b-instant", // Modèle rapide et gratuit

  // Paramètres de l'analyse
  ANALYSIS_SETTINGS: {
    temperature: 0.7,
    max_tokens: 1000,
    enabled: true, // Mettre à false pour désactiver l'analyse IA
  },

  // Configuration de l'environnement
  ENV: {
    isDevelopment: false,
    isProduction: false,
  },
};

// Fonction pour initialiser la configuration selon l'environnement
function initializeConfig() {
  try {
    // Pour Vite, les variables d'environnement sont injectées au build
    // En développement, elles sont disponibles via import.meta.env
    // Mais comme nous sommes dans un script classique, nous devons les récupérer autrement

    // Vérifier si nous sommes en développement (présence de Vite)
    const isDev =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const isProd = !isDev;

    CONFIG.ENV.isDevelopment = isDev;
    CONFIG.ENV.isProduction = isProd;

    // Charger la clé API depuis les variables d'environnement injectées par Vite
    // En développement, Vite injecte les variables dans window.__VITE_ENV__
    // ou nous pouvons les récupérer via une approche différente

    // Essayer de récupérer la clé API depuis différentes sources
    let apiKey = "";

    // 1. Depuis les variables globales injectées par Vite
    if (typeof window !== "undefined" && window.__VITE_GROQ_API_KEY__) {
      apiKey = window.__VITE_GROQ_API_KEY__;
    }

    // 2. Depuis une variable globale définie par Vite (fallback)
    if (!apiKey && typeof VITE_GROQ_API_KEY !== "undefined") {
      apiKey = VITE_GROQ_API_KEY;
    }

    // 3. Pour le développement, utiliser la clé du .env (injectée par Vite)
    if (!apiKey && isDev) {
      // Vite injecte process.env.VITE_GROQ_API_KEY via la configuration
      try {
        apiKey = process.env.VITE_GROQ_API_KEY;
      } catch (e) {
        console.warn("Impossible d'accéder à process.env:", e);
      }

      // Si toujours pas de clé, utiliser une valeur par défaut pour le développement
      if (!apiKey) {
        console.warn(
          "⚠️ Aucune clé API Groq configurée. L'analyse IA ne fonctionnera pas."
        );
        apiKey = ""; // Pas de clé par défaut pour la sécurité
      }
    }

    CONFIG.GROQ_API_KEY = apiKey;

    // Log pour le développement (sans exposer la clé)
    if (CONFIG.ENV.isDevelopment) {
      console.log("🔧 Mode développement activé");
      console.log(
        "🔑 Clé API configurée:",
        CONFIG.GROQ_API_KEY ? "✅ Oui" : "❌ Non"
      );
      console.log("🔍 Environnement détecté:", {
        isDevelopment: isDev,
        isProduction: isProd,
        hostname: window.location.hostname,
      });
    }
  } catch (error) {
    console.warn(
      "⚠️ Erreur lors de l'initialisation de la configuration:",
      error
    );
  }
}

// Initialiser au chargement
initializeConfig();

// Vérifier si la clé API est configurée
CONFIG.isConfigured = function () {
  const isValid =
    CONFIG.GROQ_API_KEY &&
    CONFIG.GROQ_API_KEY.startsWith("") &&
    CONFIG.GROQ_API_KEY.trim().length > 20;

  if (!isValid && CONFIG.ENV.isDevelopment) {
    console.warn("❌ Clé API Groq non configurée. Vérifiez votre fichier .env");
  }

  return isValid;
};

// Fonction pour obtenir des informations de debug (sans exposer la clé)
CONFIG.getDebugInfo = function () {
  return {
    hasApiKey: !!CONFIG.GROQ_API_KEY,
    apiKeyLength: CONFIG.GROQ_API_KEY ? CONFIG.GROQ_API_KEY.length : 0,
    apiKeyPrefix: CONFIG.GROQ_API_KEY
      ? CONFIG.GROQ_API_KEY.substring(0, 4) + "..."
      : "Non définie",
    environment: CONFIG.ENV,
    model: CONFIG.AI_MODEL,
    analysisEnabled: CONFIG.ANALYSIS_SETTINGS.enabled,
  };
};

// Rendre CONFIG disponible globalement
window.CONFIG = CONFIG;

// Exporter la configuration pour Node.js (si nécessaire)
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
}
