// Importa las funciones necesarias desde Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Configura el proyecto Firebase (datos otorgados por la consola de Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyDCZGrSyzbAD3BGEx-6UxBIR3Kw6O6BjhU",
    authDomain: "ecomarket-c6806.firebaseapp.com",
    projectId: "ecomarket-c6806",
    storageBucket: "ecomarket-c6806.firebasestorage.app",
    messagingSenderId: "437308738098",
    appId: "1:437308738098:web:4f5c6c10612c4e04124a2b"
  };

  // Inicia la aplicación Firebase con la configuración anterior
const app = initializeApp(firebaseConfig);

// Inicia Firestore (la base de datos en la nube de Firebase)
const db = getFirestore(app);

// Expone las funciones importantes al objeto window para que puedan ser usadas fuera del módulo
window.__firebase = {
  db,    // Base de datos Firestore
  collection, // Función para obtener una colección
  addDoc, // Función para agregar un documento
  serverTimestamp  // Función para registrar la fecha y hora del servidor
};

// Confirma en la consola de que Firebase se cargó correctamente
console.log("Firebase listo.");

