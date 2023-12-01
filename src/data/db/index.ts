import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_KE7uFxP5SmJDT2l8UJDWE-pIZJoOGpM",
  authDomain: "courses-87b46.firebaseapp.com",
  projectId: "courses-87b46",
  storageBucket: "courses-87b46.appspot.com",
  messagingSenderId: "1091208676233",
  appId: "1:1091208676233:web:52647d116853f0a1071758"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
