/**
 * AUTOMARKET — Firebase + Google Services Configuration
 *
 * INSTRUCCIONES DE SETUP:
 * 1. Ve a https://console.firebase.google.com/
 * 2. Importa el proyecto GCP: automarket-493420
 * 3. Habilita Authentication (Email/Password + Google)
 * 4. Habilita Firestore Database
 * 5. Habilita Storage
 * 6. En Configuración → Tus apps → Agrega app web → copia las credenciales abajo
 *
 * GEMINI:
 * - Ve a https://aistudio.google.com/app/apikey
 * - Crea una API key y cópiala abajo
 *
 * GOOGLE ANALYTICS:
 * - En Firebase Console → Analytics → measurementId (empieza con G-)
 */

window.AM_CONFIG = {
  // ─────────────────────────────────────────
  // MODO DE OPERACIÓN
  // 'mock'  → Sin Firebase (solo datos locales)
  // 'live'  → Firebase + APIs reales
  // ─────────────────────────────────────────
  MODE: 'mock', // CAMBIAR A 'live' cuando configures Firebase

  // ─────────────────────────────────────────
  // FIREBASE (pega aquí tu config de la consola)
  // ─────────────────────────────────────────
  firebase: {
    apiKey:            "AIzaSyDr_AdXbah-oYexSY6yjv75RmBLxeWbqAA",
    authDomain:        "automarket-493420.firebaseapp.com",
    projectId:         "automarket-493420",
    storageBucket:     "automarket-493420.firebasestorage.app",
    messagingSenderId: "691794174348",
    appId:             "1:691794174348:web:5ff3d38b112badfa86f6a9",
    measurementId:     "G-52N5JN5YPG"
  },

  // ─────────────────────────────────────────
  // BACKEND API (Cloud Run) — DESPLEGADO ✅
  // ─────────────────────────────────────────
  API_BASE: 'https://automarket-api-ym4fl5dx5q-uc.a.run.app',

  // ─────────────────────────────────────────
  // GOOGLE MAPS (para páginas de ubicación)
  // Obtener en: https://console.cloud.google.com/apis/credentials
  // ─────────────────────────────────────────
  MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY',

  // ─────────────────────────────────────────
  // FEATURE FLAGS
  // ─────────────────────────────────────────
  features: {
    geminiChat:     true,
    firebaseAuth:   true, 
    firestoreDB:    true, // 🔥 Habilitada Base de Datos Real via Firebase Client Side
    cloudStorage:   false,
    analytics:      true,
    googleMaps:     false,
  }
};

// Auto-detect live mode if Firebase keys are set
if (window.AM_CONFIG.firebase.apiKey !== 'YOUR_FIREBASE_API_KEY') {
  window.AM_CONFIG.MODE = 'live';
  window.AM_CONFIG.features.firebaseAuth = true;
  window.AM_CONFIG.features.firestoreDB = true;
  window.AM_CONFIG.features.cloudStorage = true;
  window.AM_CONFIG.features.analytics = true;
  console.log('[AUTOMARKET] 🔥 Live mode — Firebase conectado');
} else {
  console.log('[AUTOMARKET] 🧪 Mock mode — Sin Firebase');
}
