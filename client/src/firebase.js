// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: "auth-d9e86.firebaseapp.com",
    projectId: "auth-d9e86",
    storageBucket: "auth-d9e86.appspot.com",
    messagingSenderId: "998232013009",
    appId: "1:998232013009:web:032a42f35bd73d86742df0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
