// Utility/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

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
const auth = getAuth(app);
const db = getFirestore(app);

// Export the required Firestore functions
export { auth, db, collection, doc, setDoc, query, orderBy, onSnapshot };
