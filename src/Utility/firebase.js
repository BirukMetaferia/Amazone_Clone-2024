import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC7ikfMEUK2aLcfPftJ60h7hYb7yW2u5rg",
  authDomain: "e-clone-3f992.firebaseapp.com",
  projectId: "e-clone-3f992",
  storageBucket: "e-clone-3f992.appspot.com",
  messagingSenderId: "200181488369",
  appId: "1:200181488369:web:ad73175a8718a6f87a6750"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
