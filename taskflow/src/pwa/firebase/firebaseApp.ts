import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBqCNxiOqYDcYTwKy1rKjJZyyTBhMEjKfk",
  authDomain: "taskflow-4a5f3.firebaseapp.com",
  projectId: "taskflow-4a5f3",
  storageBucket: "taskflow-4a5f3.firebasestorage.app",
  messagingSenderId: "172205630575",
  appId: "1:172205630575:web:fc510423512f4519f1599a",
  measurementId: "G-9HQB62934H"
};

export const firebaseApp = initializeApp(firebaseConfig);
