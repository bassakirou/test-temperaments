// API route Vercel pour servir la configuration de manière sécurisée
// Cette route permet d'accéder aux variables d'environnement côté serveur
// et de les transmettre au client de manière contrôlée

export default function handler(req, res) {
  // Vérifier que c'est une requête GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    // Récupérer la clé API depuis les variables d'environnement Vercel
    const apiKey = process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY;

    // Log pour le débogage (sans exposer la clé complète)
    console.log('🔍 API Route - Vérification de la clé API:');
    console.log('- VITE_GROQ_API_KEY définie:', !!process.env.VITE_GROQ_API_KEY);
    console.log('- GROQ_API_KEY définie:', !!process.env.GROQ_API_KEY);
    console.log('- Clé finale trouvée:', !!apiKey);
    
    if (apiKey) {
      console.log('- Longueur de la clé:', apiKey.length);
      console.log('- Préfixe de la clé:', apiKey.substring(0, 4) + '...');
    }

    // Vérifier que la clé API est valide
    if (!apiKey || apiKey.trim() === '') {
      console.warn('⚠️ Aucune clé API trouvée dans les variables d\'environnement');
      return res.status(200).json({ 
        success: false,
        error: 'Clé API non configurée',
        debug: {
          hasViteKey: !!process.env.VITE_GROQ_API_KEY,
          hasGroqKey: !!process.env.GROQ_API_KEY,
          environment: process.env.NODE_ENV || 'unknown'
        }
      });
    }

    // Vérifier le format de la clé (doit commencer par "gsk_")
    if (!apiKey.startsWith('gsk_')) {
      console.warn('⚠️ Format de clé API invalide');
      return res.status(200).json({ 
        success: false,
        error: 'Format de clé API invalide',
        debug: {
          keyPrefix: apiKey.substring(0, 4),
          keyLength: apiKey.length
        }
      });
    }

    // Retourner la clé API de manière sécurisée
    console.log('✅ Clé API servie avec succès');
    return res.status(200).json({
      success: true,
      apiKey: apiKey,
      debug: {
        keyLength: apiKey.length,
        keyPrefix: apiKey.substring(0, 4) + '...',
        environment: process.env.NODE_ENV || 'production'
      }
    });

  } catch (error) {
    console.error('❌ Erreur dans l\'API route:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Erreur serveur',
      message: error.message 
    });
  }
}