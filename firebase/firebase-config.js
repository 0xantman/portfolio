// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");
const env = require('dotenv').config();
// Add the Firebase products that you want to use
require("firebase/auth");
require('firebase/database');
require("firebase/firestore");


 // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get a reference to the database service
module.exports = firebase;