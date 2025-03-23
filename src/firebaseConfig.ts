// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'react-native-url-polyfill/auto'; // Ensure this is imported here or at the top of your App.tsx

// Firebase configuration – replace with your own values.
const firebaseConfig = {
  apiKey: "AIzaSyAfeBRsMvhG2nlu9YXVT2ovwPkEItkMQd0",
  authDomain: "myapp-2f56d.firebaseapp.com",
  projectId: "myapp-2f56d",
  storageBucket: "myapp-2f56d.appspot.com",
  messagingSenderId: "144223661034",
  appId: "1:144223661034:android:93c72b8035ddb42bee6093"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Use default persistence (warning will show, but it won’t crash)
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
console.log("Firebase initialized successfully:", app.name);
