// Script de test pour diagnostiquer la configuration
console.log("=== DIAGNOSTIC DE CONFIGURATION ===");

// Test 1: Vérifier import.meta.env
console.log("1. Variables d'environnement Vite:");
console.log("   - import.meta.env:", import.meta.env);
console.log("   - VITE_GROQ_API_KEY:", import.meta.env.VITE_GROQ_API_KEY);
console.log("   - DEV:", import.meta.env.DEV);
console.log("   - PROD:", import.meta.env.PROD);

// Test 2: Vérifier CONFIG
console.log("\n2. Configuration actuelle:");
console.log("   - CONFIG.GROQ_API_KEY:", CONFIG.GROQ_API_KEY ? "✅ Définie" : "❌ Non définie");
console.log("   - CONFIG.ENV:", CONFIG.ENV);

// Test 3: Tester isConfigured
console.log("\n3. Test de validation:");
console.log("   - CONFIG.isConfigured():", CONFIG.isConfigured());

// Test 4: Debug info
console.log("\n4. Informations de debug:");
console.log("   - CONFIG.getDebugInfo():", CONFIG.getDebugInfo());

console.log("=== FIN DU DIAGNOSTIC ===");