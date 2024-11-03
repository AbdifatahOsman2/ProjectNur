// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbO1cgJVN05WJPHuT70K5F2Mk1h3PiXms",
  authDomain: "rahat-al-rooh.firebaseapp.com",
  projectId: "rahat-al-rooh",
  storageBucket: "rahat-al-rooh.appspot.com",
  messagingSenderId: "522407859157",
  appId: "1:522407859157:web:314a04f14820b0069d235c",
  measurementId: "G-LXC46KQLCR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { app, storage };
