// import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA99P_E6f2HFDp5ES2YQjDZ-wMyQ_lAE5g",
    authDomain: "mini-social-media-app-10002.firebaseapp.com",
    projectId: "mini-social-media-app-10002",
    storageBucket: "mini-social-media-app-10002.firebasestorage.app",
    messagingSenderId: "366253203388",
    appId: "1:366253203388:web:cc6f8121b97e7e233d15b9",
    measurementId: "G-9SLJGS9X88"
  };

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export {auth, db, onAuthStateChanged};
// export const users = collection(db, "users");

// export const snapshot = await getDocs(users)
