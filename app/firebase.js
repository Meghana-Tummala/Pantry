// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbaCBEl1-CAg9C9jFALCL8YgDk1GTc6WM",
  authDomain: "pantry-app-6a4d2.firebaseapp.com",
  projectId: "pantry-app-6a4d2",
  storageBucket: "pantry-app-6a4d2.appspot.com",
  messagingSenderId: "165936124774",
  appId: "1:165936124774:web:c61a206ef115f5796baea7",
  measurementId: "G-40GNKMG3Q6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export{app, firestore}
export{auth}