// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAMEgIBdha6Ehko8tog42zRjV4kCnaA7r4",
  authDomain: "hackathon-prep-a75e8.firebaseapp.com",
  projectId: "hackathon-prep-a75e8",
  storageBucket: "hackathon-prep-a75e8.appspot.com",
  messagingSenderId: "903919835009",
  appId: "1:903919835009:web:bff589b04568b2e9fcfa80",
  measurementId: "G-M35YDKS2J4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)