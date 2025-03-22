import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAfeBRsMvhG2nlu9YXVT2ovwPkEItkMQd0",
  authDomain: "myapp-2f56d.firebaseapp.com",
  projectId: "myapp-2f56d",
  storageBucket: "myapp-2f56d.appspot.com",
  messagingSenderId: "144223661034",
  appId: "1:144223661034:android:93c72b8035ddb42bee6093"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // No need for persistence here
const db = getFirestore(app);

export { auth, db };
console.log("Firebase initialized successfully:", app.name);