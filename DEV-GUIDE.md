# 🔧 Guide de Développement Local

## 🚀 Configuration Rapide

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration de l'environnement
```bash
npm run setup
```

### 3. Configuration de la clé API
1. Obtenez votre clé API Groq sur [console.groq.com](https://console.groq.com/)
2. Éditez le fichier `.env` créé
3. Remplacez `your_groq_api_key_here` par votre vraie clé API

### 4. Lancement du serveur de développement
```bash
npm run dev
```

## 🔒 Sécurité

- ✅ **Fichier .env** : Contient vos clés API locales (ignoré par Git)
- ✅ **Variables Vercel** : Clés API de production configurées dans Vercel Dashboard
- ❌ **JAMAIS** de clés API dans le code source

## 📁 Structure des Fichiers

```
├── .env.example          # Modèle de configuration
├── .env                  # Vos variables locales (non commitées)
├── config.js             # Configuration sécurisée
├── setup-dev.js          # Script de configuration
└── vite.config.js        # Configuration Vite
```

## 🌍 Environnements

### Développement Local
- Variables chargées depuis `.env`
- Mode debug activé
- Rechargement automatique

### Production (Vercel)
- Variables configurées dans Vercel Dashboard
- Build optimisé avec Vite
- Variables injectées au build

## 🐛 Dépannage

### Erreur "Configuration IA non trouvée"
1. Vérifiez que le fichier `.env` existe
2. Vérifiez que `VITE_GROQ_API_KEY` est définie
3. Vérifiez que la clé commence par `gsk_`

### Debug de la configuration
Ouvrez la console du navigateur et tapez :
```javascript
CONFIG.getDebugInfo()
```

## 📝 Commandes Disponibles

- `npm run setup` - Configuration initiale
- `npm run dev` - Serveur de développement Vite
- `npm run build` - Build de production
- `npm run preview` - Aperçu du build
- `npm run serve` - Serveur Python simple