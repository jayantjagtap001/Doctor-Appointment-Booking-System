// Import required functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyA2TRmeRJnIeefOwpcOYYmJ28fzv7Yt8T0",
    authDomain: "doctorsappointment-7f967.firebaseapp.com",
    projectId: "doctorsappointment-7f967",
    storageBucket: "doctorsappointment-7f967.firebasestorage.app",
    messagingSenderId: "627818113082",
    appId: "1:627818113082:web:8bbfa0714133de6edd6d03",
    measurementId: "G-FDHE1FBL43",
    databaseURL: "https://doctorsappointment-7f967-default-rtdb.firebaseio.com/" 
  };

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Realtime Database
const database = getDatabase(app);

// Export necessary functions for interaction with the database
export { database, ref, set, push, onValue, remove };
