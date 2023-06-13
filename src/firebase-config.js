// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAROkLvVwNGpALr_gVHSM_xdoGFTjjvsKI",
  authDomain: "fire-basetodo.firebaseapp.com",
  projectId: "fire-basetodo",
  storageBucket: "fire-basetodo.appspot.com",
  messagingSenderId: "93872745311",
  appId: "1:93872745311:web:7cb89eae204645ae9da4ea",
  measurementId: "G-TF6CJZRGYN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//from here is us adding stuff
//we are getting to firestone database
export const db = getFirestore(app);
