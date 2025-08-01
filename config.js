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

// Fonction pour charger la clé API depuis Vercel en production
async function loadApiKeyFromVercel() {
  try {
    // Essayer de charger depuis une API route Vercel
    const response = await fetch("/api/config");
    if (response.ok) {
      const data = await response.json();
      if (data.apiKey && data.apiKey !== "") {
        console.log("✅ Clé API chargée depuis l'API Vercel");
        return data.apiKey;
      }
    }
  } catch (error) {
    console.log("❌ Impossible de charger depuis l'API Vercel:", error.message);
  }
  return null;
}

// Fonction pour initialiser la configuration selon l'environnement
async function initializeConfig() {
  try {
    // Détecter l'environnement
    const isDev =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const isProd = !isDev;

    CONFIG.ENV.isDevelopment = isDev;
    CONFIG.ENV.isProduction = isProd;

    // Essayer de récupérer la clé API depuis différentes sources
    let apiKey = "";

    console.log("🔍 DÉBOGAGE - Configuration IA:");
    console.log("- Environnement:", isDev ? "Développement" : "Production");
    console.log("- Hostname:", window.location.hostname);

    // Méthode 1: Essayer process.env (injecté par Vite) - pour le développement
    if (isDev) {
      try {
        if (
          typeof process !== "undefined" &&
          process.env &&
          process.env.VITE_GROQ_API_KEY &&
          process.env.VITE_GROQ_API_KEY !== '""' &&
          process.env.VITE_GROQ_API_KEY !== "undefined"
        ) {
          apiKey = process.env.VITE_GROQ_API_KEY;
          // Nettoyer les guillemets si présents
          if (apiKey.startsWith('"') && apiKey.endsWith('"')) {
            apiKey = apiKey.slice(1, -1);
          }
          console.log("✅ Clé trouvée via process.env.VITE_GROQ_API_KEY");
        }
      } catch (e) {
        console.log("❌ process.env non accessible:", e.message);
      }

      // Méthode 2: Variables globales (fallback pour le développement)
      if (!apiKey) {
        try {
          if (
            typeof window !== "undefined" &&
            window.__VITE_GROQ_API_KEY__ &&
            window.__VITE_GROQ_API_KEY__ !== '""' &&
            window.__VITE_GROQ_API_KEY__ !== "undefined"
          ) {
            apiKey = window.__VITE_GROQ_API_KEY__;
            if (apiKey.startsWith('"') && apiKey.endsWith('"')) {
              apiKey = apiKey.slice(1, -1);
            }
            console.log("✅ Clé trouvée via window.__VITE_GROQ_API_KEY__");
          }
        } catch (e) {
          console.log(
            "❌ window.__VITE_GROQ_API_KEY__ non accessible:",
            e.message
          );
        }
      }
    }

    // Méthode 3: Pour la production, essayer de charger depuis l'API Vercel
    if (isProd && !apiKey) {
      console.log("🔄 Tentative de chargement depuis l'API Vercel...");
      apiKey = await loadApiKeyFromVercel();
    }

    CONFIG.GROQ_API_KEY = apiKey;

    // Log détaillé pour le débogage
    console.log("🔧 Résultat de la configuration:");
    console.log("- Clé API trouvée:", !!apiKey);
    if (apiKey) {
      console.log("- Longueur de la clé:", apiKey.length);
      console.log("- Préfixe:", apiKey.substring(0, 4) + "...");
      console.log(
        "- Format valide:",
        apiKey.startsWith("") && apiKey.length > 20
      );
    } else {
      console.warn("⚠️ AUCUNE CLÉ API TROUVÉE !");
      if (isProd) {
        console.warn(
          "🔧 En production: Vérifiez que VITE_GROQ_API_KEY est configurée dans Vercel"
        );
        console.warn(
          "💡 Alternative: Créez une API route /api/config pour servir la clé"
        );
      } else {
        console.warn("🔧 En développement: Vérifiez votre fichier .env");
      }
    }

    // Déclencher la mise à jour du statut IA après le chargement
    if (typeof updateAIStatus === "function") {
      updateAIStatus();
    }
  } catch (error) {
    console.error(
      "❌ Erreur lors de l'initialisation de la configuration:",
      error
    );
  }
}

// Initialiser au chargement (maintenant asynchrone)
initializeConfig();

// Vérifier si la clé API est configurée
CONFIG.isConfigured = function () {
  const isValid =
    CONFIG.GROQ_API_KEY &&
    CONFIG.GROQ_API_KEY.startsWith("") &&
    CONFIG.GROQ_API_KEY.trim().length > 20;

  return isValid;
};

// Fonction pour recharger la configuration (utile pour les tests)
CONFIG.reload = function () {
  return initializeConfig();
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
