// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA53Mm_5L5KK40Eu_hx6o3InGlQ9C7CF2o",
    authDomain: "limlogic.firebaseapp.com",
    projectId: "limlogic",
    storageBucket: "limlogic.firebasestorage.app",
    messagingSenderId: "508391858250",
    appId: "1:508391858250:web:ffe2fee4e54226efbb06b3",
    measurementId: "G-0XVP9BTEQZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
