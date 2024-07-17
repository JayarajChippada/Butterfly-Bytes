// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-47673.firebaseapp.com",
  projectId: "mern-blog-47673",
  storageBucket: "mern-blog-47673.appspot.com",
  messagingSenderId: "1098435918871",
  appId: "1:1098435918871:web:da8722e1540e9ba8aff052",
  measurementId: "G-0WFQ3M2REX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);