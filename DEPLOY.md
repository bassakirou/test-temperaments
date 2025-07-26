# 🚀 Déploiement sur Vercel

## Étapes de déploiement

### 1. Prérequis
- Compte GitHub (gratuit)
- Compte Vercel (gratuit)
- Clé API Groq (gratuite) : https://console.groq.com/keys

### 2. Préparation du code
✅ **Déjà fait :**
- Clé API sécurisée via variables d'environnement
- Configuration Vercel optimisée
- Application 100% statique

### 3. Déploiement automatique

#### Option A : Via GitHub (recommandé)
1. **Pusher le code sur GitHub :**
   ```bash
   git add .
   git commit -m "Prêt pour déploiement Vercel"
   git push origin main
   ```

2. **Connecter à Vercel :**
   - Aller sur https://vercel.com
   - Se connecter avec GitHub
   - Cliquer "New Project"
   - Sélectionner votre repository
   - Cliquer "Deploy"

#### Option B : Via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 4. Configuration des variables d'environnement

**Dans Vercel Dashboard :**
1. Aller dans votre projet
2. Settings > Environment Variables
3. Ajouter :
   - **Name:** `VITE_GROQ_API_KEY`
   - **Value:** `gsk_votre_cle_api_groq_ici`
   - **Environment:** Production

### 5. URLs finales
- **Production :** `https://votre-projet.vercel.app`
- **Index :** `https://votre-projet.vercel.app/`
- **Quiz :** `https://votre-projet.vercel.app/quiz.html`

## ✅ Fonctionnalités après déploiement
- ✅ Application entièrement fonctionnelle
- ✅ Menu multilingue (FR/EN)
- ✅ Tests de personnalité
- ✅ Analyse IA (si clé API configurée)
- ✅ Interface responsive
- ✅ Sécurité renforcée

## 🔧 Maintenance
- **Mises à jour :** Push sur GitHub = déploiement automatique
- **Monitoring :** Dashboard Vercel
- **Logs :** Vercel Functions (si nécessaire)

## 🆘 Dépannage
- **Erreur 404 :** Vérifier vercel.json
- **API ne fonctionne pas :** Vérifier la variable d'environnement
- **Menu ne charge pas :** Vérifier les chemins relatifs