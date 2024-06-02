// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWpiUAjcZD-SeAy7F9g6MiBoWTTWv9YwI",
  authDomain: "techozon-adf9a.firebaseapp.com",
  projectId: "techozon-adf9a",
  storageBucket: "techozon-adf9a.appspot.com",
  messagingSenderId: "776950106439",
  appId: "1:776950106439:web:7bba63a2e119842580e462",
  measurementId: "G-J644FJN69X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
