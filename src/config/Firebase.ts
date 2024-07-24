import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyACz5f4WgyhA0OwEhxA4dLQwtKzwReLEB4",
    authDomain: "caffeumv2.firebaseapp.com",
    projectId: "caffeumv2",
    storageBucket: "caffeumv2.appspot.com",
    messagingSenderId: "875335040831",
    appId: "1:875335040831:web:08a26b92bf6b0421f59d8a",
    measurementId: "G-PPVMQQTP8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);