// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
apiKey:process.env.REACT_APP_API_KEY,
authDomain: process.env.REACT_APP_API_AUTH,
projectId: process.env.REACT_APP_API_PROJECT,
storageBucket: process.env.REACT_APP_API_STORAGE,
messagingSenderId: process.env.REACT_APP_API_MESSAGE,
appId: process.env.REACT_APP_API_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);