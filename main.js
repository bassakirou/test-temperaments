// Script principal pour l'application
import "./styles.css";

// Variables globales
let questions = [];
let current = 0;
let scores = {
  sanguine: 0,
  choleric: 0,
  melancholy: 0,
  phlegmatic: 0,
};
let userResponses = []; // Stocker les réponses pour l'analyse IA
let currentLanguage = "fr"; // Langue par défaut

// Configuration IA (sera chargée dynamiquement)
let aiConfig = null;

// Charger la configuration IA
async function loadAIConfig() {
  try {
    // Charger config.js comme un script
    const script = document.createElement("script");
    script.src = "./config.js";

    return new Promise((resolve, reject) => {
      script.onload = () => {
        // CONFIG est maintenant disponible globalement
        if (window.CONFIG) {
          aiConfig = window.CONFIG;
          console.log("Configuration IA chargée:", aiConfig.getDebugInfo());
          resolve();
        } else {
          reject(new Error("CONFIG non trouvé"));
        }
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  } catch (error) {
    console.log("Configuration IA non trouvée:", error);
    aiConfig = null;
  }
}

// Système de traductions
const translations = {
  fr: {
    mainTitle: "Test de Personnalité : Les 4 Tempéraments",
    welcomeText:
      "Bienvenue ! Ce test ludique te permettra de découvrir ton tempérament dominant parmi les 4 types : Sanguin, Colérique, Mélancolique, Flegmatique.",
    instructionText:
      "Pour chaque question, réponds de 1 (Pas du tout) à 5 (Tout à fait).",
    startBtn: "Commencer le test",
    restartBtn: "Refaire le test",
    aiAnalysisTitle: "Analyse Personnalisée par IA",
    generatingAnalysis: "Génération de votre analyse personnalisée...",
    aiEnabled:
      "🤖 <strong>Analyse IA activée</strong> - Vous recevrez une analyse personnalisée détaillée !",
    aiDisabled:
      "📊 Analyse IA désactivée - Vous recevrez les résultats de base.",
    aiNotFound:
      "⚠️ Configuration IA non trouvée - Veuillez configurer config.js pour l'analyse IA.",
    dominantTemperament: "Votre tempérament dominant :",
    question: "Question",
    of: "sur",
    temperaments: {
      sanguine: "Sanguin",
      choleric: "Colérique",
      melancholy: "Mélancolique",
      phlegmatic: "Flegmatique",
    },
  },
  en: {
    mainTitle: "Personality Test: The 4 Temperaments",
    welcomeText:
      "Welcome! This fun test will help you discover your dominant temperament among the 4 types: Sanguine, Choleric, Melancholic, Phlegmatic.",
    instructionText:
      "For each question, answer from 1 (Not at all) to 5 (Completely).",
    startBtn: "Start the test",
    restartBtn: "Retake the test",
    aiAnalysisTitle: "AI Personalized Analysis",
    generatingAnalysis: "Generating your personalized analysis...",
    aiEnabled:
      "🤖 <strong>AI Analysis enabled</strong> - You will receive a detailed personalized analysis!",
    aiDisabled: "📊 AI Analysis disabled - You will receive basic results.",
    aiNotFound:
      "⚠️ AI Configuration not found - Please configure config.js for AI analysis.",
    dominantTemperament: "Your dominant temperament:",
    question: "Question",
    of: "of",
    temperaments: {
      sanguine: "Sanguine",
      choleric: "Choleric",
      melancholy: "Melancholic",
      phlegmatic: "Phlegmatic",
    },
  },
};

// Descriptions des tempéraments (multilingue)
const temperamentDescriptions = {
  fr: {
    sanguine: {
      name: "Sanguin",
      emoji: "😄",
      color: "#ff6b6b",
      traits: ["Extraverti", "Optimiste", "Sociable", "Spontané"],
    },
    choleric: {
      name: "Colérique",
      emoji: "💪",
      color: "#4ecdc4",
      traits: ["Leader", "Déterminé", "Ambitieux", "Direct"],
    },
    melancholy: {
      name: "Mélancolique",
      emoji: "🤔",
      color: "#45b7d1",
      traits: ["Analytique", "Perfectionniste", "Réfléchi", "Créatif"],
    },
    phlegmatic: {
      name: "Flegmatique",
      emoji: "😌",
      color: "#96ceb4",
      traits: ["Calme", "Loyal", "Patient", "Diplomate"],
    },
  },
  en: {
    sanguine: {
      name: "Sanguine",
      emoji: "😄",
      color: "#ff6b6b",
      traits: ["Extroverted", "Optimistic", "Sociable", "Spontaneous"],
    },
    choleric: {
      name: "Choleric",
      emoji: "💪",
      color: "#4ecdc4",
      traits: ["Leader", "Determined", "Ambitious", "Direct"],
    },
    melancholy: {
      name: "Melancholic",
      emoji: "🤔",
      color: "#45b7d1",
      traits: ["Analytical", "Perfectionist", "Thoughtful", "Creative"],
    },
    phlegmatic: {
      name: "Phlegmatic",
      emoji: "😌",
      color: "#96ceb4",
      traits: ["Calm", "Loyal", "Patient", "Diplomatic"],
    },
  },
};

// Fonction pour changer de langue
function setLanguage(lang) {
  currentLanguage = lang;

  // Mettre à jour les boutons de langue
  document
    .querySelectorAll(".lang-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document.getElementById(`lang-${lang}`).classList.add("active");

  // Appliquer les traductions
  applyTranslations();

  // Mettre à jour la langue du menu
  updateMenuLanguageFromPage();

  // Recharger les questions si nécessaire
  if (questions.length > 0) {
    loadQuestions();
  }
}

// Appliquer les traductions
function applyTranslations() {
  const t = translations[currentLanguage];

  document.getElementById("main-title").textContent = t.mainTitle;
  document.getElementById("welcome-text").textContent = t.welcomeText;
  document.getElementById("instruction-text").textContent = t.instructionText;
  document.getElementById("start-btn").textContent = t.startBtn;
  document.getElementById("restart-btn").textContent = t.restartBtn;
  document.getElementById("ai-analysis-title").textContent = t.aiAnalysisTitle;
}

// Charger le menu
async function loadMenu() {
  try {
    const response = await fetch("./menu.html");
    const menuHtml = await response.text();
    document.getElementById("menu-placeholder").innerHTML = menuHtml;

    // Initialiser le menu après chargement
    if (typeof initializeMenu === "function") {
      initializeMenu();
    }
  } catch (error) {
    console.log("Menu non trouvé:", error);
  }
}

// Charger les questions
async function loadQuestions() {
  try {
    const response = await fetch("./questions.json");
    const data = await response.json();
    questions = data.map(item => ({
      text: item.text[currentLanguage] || item.text.fr,
      temperament: Object.keys(item.types).reduce((a, b) => item.types[a] > item.types[b] ? a : b)
    }));
    console.log(`Questions chargées: ${questions.length} questions`);
  } catch (error) {
    console.error("Erreur lors du chargement des questions:", error);
    questions = [];
  }
}

// Initialisation de l'application
async function initApp() {
  await loadAIConfig();
  await loadMenu();
  await loadQuestions();

  // Vérifier le statut de l'IA
  checkAIStatus();

  // Appliquer les traductions
  applyTranslations();
}

// Vérifier le statut de l'IA
function checkAIStatus() {
  const aiStatusElement = document.getElementById("ai-status");
  const t = translations[currentLanguage];

  if (
    aiConfig &&
    aiConfig.isConfigured() &&
    aiConfig.ANALYSIS_SETTINGS.enabled
  ) {
    aiStatusElement.innerHTML = t.aiEnabled;
    aiStatusElement.style.color = "#4CAF50";
  } else if (aiConfig && !aiConfig.isConfigured()) {
    aiStatusElement.innerHTML = t.aiNotFound;
    aiStatusElement.style.color = "#F44336";
  } else if (aiConfig && !aiConfig.ANALYSIS_SETTINGS.enabled) {
    aiStatusElement.innerHTML = t.aiDisabled;
    aiStatusElement.style.color = "#FF9800";
  } else {
    aiStatusElement.innerHTML = t.aiNotFound;
    aiStatusElement.style.color = "#F44336";
  }
}

// Mettre à jour le statut de l'IA
function updateAIStatus() {
  const aiStatusElement = document.getElementById("ai-status");
  const t = translations[currentLanguage];

  if (aiConfig && aiConfig.isConfigured()) {
    aiStatusElement.innerHTML = t.aiEnabled;
    aiStatusElement.style.color = "#4CAF50";
  } else if (aiConfig && !aiConfig.isConfigured()) {
    aiStatusElement.innerHTML = t.aiNotFound;
    aiStatusElement.style.color = "#F44336";
  } else if (aiConfig && !aiConfig.ANALYSIS_SETTINGS.enabled) {
    aiStatusElement.innerHTML = t.aiDisabled;
    aiStatusElement.style.color = "#FF9800";
  } else {
    aiStatusElement.innerHTML = t.aiNotFound;
    aiStatusElement.style.color = "#F44336";
  }
}

// Exposer updateAIStatus globalement pour config.js
window.updateAIStatus = updateAIStatus;

// Fonctions du quiz (à implémenter)
function startQuiz() {
  if (questions.length === 0) {
    alert("Questions non chargées");
    return;
  }

  current = 0;
  scores = { sanguine: 0, choleric: 0, melancholy: 0, phlegmatic: 0 };
  userResponses = [];

  document.querySelector(".intro").classList.add("hidden");
  document.querySelector(".quiz").classList.remove("hidden");

  showQuestion();
}

function showQuestion() {
  if (current >= questions.length) {
    showResult();
    return;
  }

  const question = questions[current];
  document.getElementById("question-text").textContent = question.text;
  document.getElementById("progress").textContent = `${
    translations[currentLanguage].question
  } ${current + 1} ${translations[currentLanguage].of} ${questions.length}`;

  // Créer les boutons de réponse
  const buttonsContainer = document.getElementById("scale-buttons");
  buttonsContainer.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className = "scale-btn";
    button.onclick = () => selectAnswer(i);
    buttonsContainer.appendChild(button);
  }
}

function selectAnswer(value) {
  const question = questions[current];

  // Enregistrer la réponse
  userResponses.push({
    question: question.text,
    answer: value,
    temperament: question.temperament,
  });

  // Ajouter aux scores
  scores[question.temperament] += value;

  current++;
  showQuestion();
}

function showResult() {
  document.querySelector(".quiz").classList.add("hidden");
  document.querySelector(".result").classList.remove("hidden");

  // Trouver le tempérament dominant
  const dominant = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  // Afficher les résultats
  displayResults(dominant);

  // Générer l'analyse IA si disponible
  if (aiConfig && aiConfig.isConfigured()) {
    generateAIAnalysis(dominant);
  }
}

function displayResults(dominant) {
  const t = translations[currentLanguage];
  const desc = temperamentDescriptions[currentLanguage];

  document.getElementById(
    "temperament-title"
  ).innerHTML = `${t.dominantTemperament} ${desc[dominant].emoji} ${desc[dominant].name}`;

  // Afficher la grille des scores
  const scoresGrid = document.getElementById("scores-grid");
  scoresGrid.innerHTML = "";

  Object.keys(scores).forEach((temp) => {
    const scoreCard = document.createElement("div");
    scoreCard.className = "score-card";
    scoreCard.style.borderLeft = `4px solid ${desc[temp].color}`;

    const percentage = Math.round(
      (scores[temp] / (questions.length * 5)) * 100
    );

    scoreCard.innerHTML = `
            <h3 style="color: ${desc[temp].color};">${desc[temp].emoji} ${
      desc[temp].name
    }</h3>
            <div class="score-bar">
                <div class="score-fill" style="width: ${percentage}%; background-color: ${
      desc[temp].color
    };"></div>
            </div>
            <p>${percentage}%</p>
            <div class="traits">
                ${desc[temp].traits
                  .map((trait) => `<span class="trait">${trait}</span>`)
                  .join(", ")}
            </div>
        `;

    scoresGrid.appendChild(scoreCard);
  });
}

async function generateAIAnalysis(dominant) {
  const aiAnalysisDiv = document.getElementById("ai-analysis");
  const contentDiv = document.getElementById("ai-analysis-content");
  const loader = document.getElementById("analysis-loader");

  aiAnalysisDiv.style.display = "block";
  loader.style.display = "inline-block";
  contentDiv.innerHTML = translations[currentLanguage].generatingAnalysis;

  try {
    // Préparer les données pour l'IA
    const analysisData = {
      dominant_temperament: dominant,
      scores: scores,
      responses: userResponses,
      language: currentLanguage,
    };

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${aiConfig.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: aiConfig.AI_MODEL,
          messages: [
            {
              role: "system",
              content: `Tu es un expert en psychologie des tempéraments. Analyse les résultats du test et fournis une analyse personnalisée en ${
                currentLanguage === "fr" ? "français" : "anglais"
              }.`,
            },
            {
              role: "user",
              content: `Voici les résultats du test de tempérament : ${JSON.stringify(
                analysisData
              )}. Fournis une analyse détaillée et des conseils personnalisés.`,
            },
          ],
          max_tokens: aiConfig.ANALYSIS_SETTINGS.max_tokens,
          temperature: aiConfig.ANALYSIS_SETTINGS.temperature,
        }),
      }
    );

    const data = await response.json();

    if (data.choices && data.choices[0]) {
      contentDiv.innerHTML = marked.parse(data.choices[0].message.content);
    } else {
      throw new Error("Réponse invalide de l'IA");
    }
  } catch (error) {
    console.error("Erreur lors de l'analyse IA:", error);
    contentDiv.innerHTML = "Erreur lors de la génération de l'analyse IA.";
  } finally {
    loader.style.display = "none";
  }
}

function restartTest() {
  document.querySelector(".result").classList.add("hidden");
  document.querySelector(".intro").classList.remove("hidden");

  // Réinitialiser les variables
  current = 0;
  scores = { sanguine: 0, choleric: 0, melancholy: 0, phlegmatic: 0 };
  userResponses = [];
}

function updateMenuLanguageFromPage() {
  // Fonction pour synchroniser la langue avec le menu
  if (typeof updateMenuLanguage === "function") {
    updateMenuLanguage(currentLanguage);
  }
}

// Exposer les fonctions globalement pour les boutons HTML
window.setLanguage = setLanguage;
window.startQuiz = startQuiz;
window.restartTest = restartTest;

// Initialiser l'application au chargement
document.addEventListener("DOMContentLoaded", initApp);
