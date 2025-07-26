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
    // En production, elles sont injectées via define dans vite.config.js

    // Vérifier si nous sommes en développement (présence de Vite)
    const isDev =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const isProd = !isDev;

    CONFIG.ENV.isDevelopment = isDev;
    CONFIG.ENV.isProduction = isProd;

    // Essayer de récupérer la clé API depuis différentes sources
    let apiKey = "";

    // DÉBOGAGE : Afficher toutes les sources possibles
    console.log("🔍 DÉBOGAGE - Sources de variables d'environnement:");
    console.log("- window.__VITE_GROQ_API_KEY__:", typeof window.__VITE_GROQ_API_KEY__, window.__VITE_GROQ_API_KEY__);
    console.log("- typeof VITE_GROQ_API_KEY:", typeof VITE_GROQ_API_KEY);
    console.log("- process.env (si accessible):", typeof process !== 'undefined' ? typeof process.env : 'undefined');
    
    // Essayer process.env.VITE_GROQ_API_KEY (injecté par Vite define)
    try {
      if (typeof process !== 'undefined' && process.env && process.env.VITE_GROQ_API_KEY) {
        apiKey = process.env.VITE_GROQ_API_KEY;
        console.log("✅ Clé trouvée via process.env.VITE_GROQ_API_KEY");
      }
    } catch (e) {
      console.log("❌ process.env non accessible:", e.message);
    }

    // 1. Depuis les variables globales injectées par Vite
    if (!apiKey && typeof window !== "undefined" && window.__VITE_GROQ_API_KEY__) {
      apiKey = window.__VITE_GROQ_API_KEY__;
      console.log("✅ Clé trouvée via window.__VITE_GROQ_API_KEY__");
    }

    // 2. Depuis une variable globale définie par Vite (fallback)
    if (!apiKey && typeof VITE_GROQ_API_KEY !== "undefined") {
      apiKey = VITE_GROQ_API_KEY;
      console.log("✅ Clé trouvée via VITE_GROQ_API_KEY global");
    }

    // 3. Essayer import.meta.env (pour Vite en développement)
    if (!apiKey && typeof import !== 'undefined') {
      try {
        // Cette approche ne fonctionne que dans les modules ES6
        // mais nous sommes dans un script classique
        console.log("⚠️ import.meta.env non accessible dans un script classique");
      } catch (e) {
        console.log("❌ import.meta.env non accessible:", e.message);
      }
    }

    CONFIG.GROQ_API_KEY = apiKey;

    // Log détaillé pour le débogage
    console.log("🔧 Configuration IA - Débogage détaillé:");
    console.log("- Environnement:", {
      isDevelopment: isDev,
      isProduction: isProd,
      hostname: window.location.hostname,
      origin: window.location.origin
    });
    console.log("- Clé API:", {
      found: !!apiKey,
      length: apiKey ? apiKey.length : 0,
      prefix: apiKey ? apiKey.substring(0, 4) + "..." : "Non définie",
      isValid: apiKey && apiKey.startsWith("") && apiKey.length > 20
    });

    if (!apiKey) {
      console.warn("⚠️ AUCUNE CLÉ API TROUVÉE !");
      console.warn("En production, vérifiez que VITE_GROQ_API_KEY est configurée dans Vercel");
      console.warn("En développement, vérifiez votre fichier .env");
    }
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation de la configuration:", error);
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
