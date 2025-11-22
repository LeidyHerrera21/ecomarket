import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDCZGrSyzbAD3BGEx-6UxBIR3Kw6O6BjhU",
    authDomain: "ecomarket-c6806.firebaseapp.com",
    projectId: "ecomarket-c6806",
    storageBucket: "ecomarket-c6806.firebasestorage.app",
    messagingSenderId: "437308738098",
    appId: "1:437308738098:web:4f5c6c10612c4e04124a2b"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.__firebase = {
  db,
  collection,
  addDoc,
  serverTimestamp
};

console.log("Firebase listo.");

