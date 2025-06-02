import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBc9-d6ClqLQ2R-GhpmtAqCx3Gb2LWDwXk",
  authDomain: "eventoscomunitarios-7bbcd.firebaseapp.com",
  projectId: "eventoscomunitarios-7bbcd",
  storageBucket: "eventoscomunitarios-7bbcd.appspot.com",
  messagingSenderId: "702147516457",
  appId: "1:702147516457:web:6f9f6b02a60a05d538e438",
  measurementId: "G-TJ4468V9MX"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const messaging = getMessaging(app);
