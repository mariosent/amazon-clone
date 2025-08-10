// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAuth} from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmzBdGVQ-GEa1xtaCfxS8UfeqymxqC1Vw",
  authDomain: "clone-31f7a.firebaseapp.com",
  projectId: "clone-31f7a",
  storageBucket: "clone-31f7a.firebasestorage.app",
  messagingSenderId: "1042651550271",
  appId: "1:1042651550271:web:4030985b90acec2c505e8a"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();