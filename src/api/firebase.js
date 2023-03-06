// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDWsedgoVaQU7lB5HRqaEdz_b5grNowiPA",
  authDomain: "fgo-project-260c6.firebaseapp.com",
  projectId: "fgo-project-260c6",
  storageBucket: "fgo-project-260c6.appspot.com",
  messagingSenderId: "276244247923",
  appId: "1:276244247923:web:0ad3d58e0a5570dd388106"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);