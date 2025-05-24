

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyAvcPmAR3qQSWwHPfyoCUwYraN0qa7Zsgw",
  authDomain: "nextinnomind-classmate.firebaseapp.com",
  databaseURL: "https://nextinnomind-classmate-default-rtdb.firebaseio.com",
  projectId: "nextinnomind-classmate",
  storageBucket: "nextinnomind-classmate.firebasestorage.app",
  messagingSenderId: "361721480881",
  appId: "1:361721480881:web:f802d1b6e22f0efe6ec490",
  measurementId: "G-T4P27YNSQG"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
