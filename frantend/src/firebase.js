// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2TRmeRJnIeefOwpcOYYmJ28fzv7Yt8T0",
  authDomain: "doctorsappointment-7f967.firebaseapp.com",
  projectId: "doctorsappointment-7f967",
  storageBucket: "doctorsappointment-7f967.appspot.com",
  messagingSenderId: "627818113082",
  appId: "1:627818113082:web:8bbfa0714133de6edd6d03",
  measurementId: "G-FDHE1FBL43",
  databaseURL: "https://doctorsappointment-7f967-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Database
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
