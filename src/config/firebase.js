// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


// Configuración de Firebase
const firebaseConfig = {
 
  apiKey: "AIzaSyA2Ii7epn69Mpk3nUOi4KOcBSruTfCAhSs",
 
  authDomain: "practica-firebase-1e721.firebaseapp.com",
 
  projectId: "practica-firebase-1e721",
 
  storageBucket: "practica-firebase-1e721.firebasestorage.app",
 
  messagingSenderId: "9905234317",
 
  appId: "1:9905234317:web:aabbf0a30e413db6311dc4"
 
};


console.log('Configuración de Firebase:', firebaseConfig);

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase inicializado');

// Inicializar Firestore
const database = getFirestore(app);
console.log('Firestore inicializado');

// Inicializar Auth (con persistencia por defecto)
const auth = getAuth(app);
console.log('Auth inicializado');

export { auth, database };
