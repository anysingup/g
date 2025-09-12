// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "harinkhaine-result-portal",
  "appId": "1:582505928895:web:a638259cdc20c88d038e0a",
  "storageBucket": "harinkhaine-result-portal.firebasestorage.app",
  "apiKey": "AIzaSyBzlcg9ILW98ilAzWyvzrYM6snKOurFgXI",
  "authDomain": "harinkhaine-result-portal.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "582505928895",
  "databaseURL": "https://harinkhaine-result-portal-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
