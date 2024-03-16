// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,  //HIDE API KEY 
  authDomain: "real-estate-accc2.firebaseapp.com",
  projectId: "real-estate-accc2",
  storageBucket: "real-estate-accc2.appspot.com",
  messagingSenderId: "151204679810",
  appId: "1:151204679810:web:533b1a80e39a8a8fe8a49b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default  app;