import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    // Your Firebase config here
      apiKey: "AIzaSyBRyS9vLwETUSQ7lS8T3rtVUw189wxHCZc",
      authDomain: "bobabae-2a4f7.firebaseapp.com",
      projectId: "bobabae-2a4f7",
      storageBucket: "bobabae-2a4f7.appspot.com",
      messagingSenderId: "640143731558",
      appId: "1:640143731558:web:a871f874a6374213ad76a7"
  };

  
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);