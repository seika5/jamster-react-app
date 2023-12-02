import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWhWziAzaOKlkdICYbWDaXiRrz-PpjM_4",
  authDomain: "jamster-1.firebaseapp.com",
  projectId: "jamster-1",
  storageBucket: "jamster-1.appspot.com",
  messagingSenderId: "519801549389",
  appId: "1:519801549389:web:4a49177066aa39db76e204",
  measurementId: "G-FL3JRN9DPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export firestore database
export const db = getFirestore(app);