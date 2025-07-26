# Déploiement sur Vercel - Guide Complet

## 🚀 Nouveau Déploiement Vercel

### Étapes pour créer un nouveau projet Vercel :

1. **Aller sur [vercel.com](https://vercel.com)**
2. **Cliquer sur "New Project"**
3. **Importer depuis GitHub** : `bassakirou/test-temperaments`
4. **Configuration du projet** :
   - **Framework Preset** : Vite
   - **Root Directory** : `./` (racine)
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`

### 🔧 Variables d'environnement à configurer

**IMPORTANT** : Après création du projet, aller dans **Settings > Environment Variables** et ajouter :

```
VITE_GROQ_API_KEY=votre_clé_api_groq_ici
```

**Environnements** : Sélectionner `Production`, `Preview`, et `Development`

### 📝 Informations du projet

- **Repository** : https://github.com/bassakirou/test-temperaments
- **Branch** : main
- **Dernier commit** : ab770b1 (Security: Suppression complète des clés API)
- **Framework** : Vite + Vanilla JS

### ✅ Vérifications post-déploiement

1. L'application se charge correctement
2. Le message "Analyse IA activée" apparaît sur la page d'accueil
3. Les tests de personnalité fonctionnent
4. L'analyse IA génère des résultats (après configuration de la clé API)

### 🔍 Dépannage

Si l'analyse IA ne fonctionne pas :
1. Vérifier que `VITE_GROQ_API_KEY` est bien configurée dans Vercel
2. Redéployer le projet après ajout de la variable
3. Vérifier la console du navigateur pour les erreurs

---

**Date de création** : $(date)
**Version du code** : ab770b1