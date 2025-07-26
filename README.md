# Test de Personnalité : Les 4 Tempéraments

Une application web interactive pour découvrir votre tempérament dominant parmi les 4 types classiques : Sanguin, Colérique, Mélancolique et Flegmatique.

## 🌟 Fonctionnalités

- **Test interactif** avec 48 questions personnalisées
- **Support multilingue** (Français/Anglais) avec drapeaux
- **Descriptions détaillées** pour chaque question
- **Analyse IA personnalisée** via l'API Groq
- **Interface moderne** et responsive
- **Scores précis** avec affichage à 2 décimales
- **Design élégant** avec animations et couleurs thématiques

## 🚀 Déploiement sur Vercel

### Méthode 1 : Via l'interface Vercel (Recommandée)

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec votre compte GitHub/GitLab/Bitbucket
3. Cliquez sur "New Project"
4. Importez votre repository ou uploadez les fichiers
5. Vercel détectera automatiquement la configuration
6. Cliquez sur "Deploy"

### Méthode 2 : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Dans le dossier du projet
vercel

# Suivre les instructions
```

### Méthode 3 : Drag & Drop

1. Allez sur [vercel.com/new](https://vercel.com/new)
2. Glissez-déposez le dossier du projet
3. Vercel déploiera automatiquement

## ⚙️ Configuration

### Variables d'environnement (Optionnel)

Pour l'analyse IA, vous pouvez configurer :

- `GROQ_API_KEY` : Votre clé API Groq (optionnel, peut être configuré côté client)

### Fichiers de configuration

- `vercel.json` : Configuration de déploiement Vercel
- `config.js` : Configuration de l'API IA (côté client)
- `questions.json` : Base de données des questions multilingues

## 🛠️ Structure du projet

```
temperaments/
├── index.html          # Application principale
├── questions.json      # Questions multilingues avec descriptions
├── config.js          # Configuration IA
├── vercel.json        # Configuration Vercel
├── package.json       # Métadonnées du projet
└── README.md          # Documentation
```

## 🎯 Utilisation

1. Sélectionnez votre langue (FR/EN)
2. Répondez aux 48 questions sur une échelle de 1 à 5
3. Consultez vos résultats détaillés
4. Profitez de l'analyse IA personnalisée (si configurée)

## 🔧 Développement local

```bash
# Serveur Python simple
python -m http.server 8000

# Ou avec Node.js
npx serve .

# Accédez à http://localhost:8000
```

## 📊 Tempéraments

- **🔥 Sanguin** : Extraverti, optimiste, sociable
- **⚡ Colérique** : Leader, ambitieux, déterminé  
- **🎨 Mélancolique** : Créatif, perfectionniste, réfléchi
- **🌊 Flegmatique** : Calme, patient, diplomate

## 🤖 Analyse IA

L'application utilise l'API Groq pour générer des analyses personnalisées basées sur :
- Le tempérament dominant
- Les scores détaillés
- Les réponses spécifiques
- Des conseils de développement personnel

## 📱 Responsive Design

L'application s'adapte automatiquement à tous les écrans :
- Desktop
- Tablette  
- Mobile

## 🌐 Support multilingue

- Interface complètement traduite
- Questions et descriptions bilingues
- Analyse IA adaptée à la langue choisie

## 📄 Licence

MIT License - Libre d'utilisation et de modification.

---

**Développé avec ❤️ pour la découverte de soi**