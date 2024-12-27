// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD0CnmKPZFWTy6wy1o1l9d6sC2SRwOBr6g",
  authDomain: "catexpress-tracking.firebaseapp.com",
  projectId: "catexpress-tracking",
  storageBucket: "catexpress-tracking.firebasestorage.app",
  messagingSenderId: "8003925122",
  appId: "1:8003925122:web:d4c15a56b99a176a87b09b",
  measurementId: "G-Q8JB7B1WZP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
export { db, auth }