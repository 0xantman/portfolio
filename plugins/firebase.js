
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";


 // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NUXT_ENV_FIREBASE_API_KEY,
    authDomain: process.env.NUXT_ENV_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NUXT_ENV_FIREBASE_DATABASE_URL,
    storageBucket: process.env.NUXT_ENV_FIREBASE_STORAGE_BUCKET
};
// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export default function ({store}) {
    firebase.auth().onAuthStateChanged(user => {
    if(!user)
        return store.$auth.logout();
    });    
}