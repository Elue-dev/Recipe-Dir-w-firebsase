import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID ,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}

initializeApp(firebaseConfig) //initialize firebase app
const db = getFirestore() //initialize services
const colRef = collection(db, 'recipes') //reference to a specific collection (collection reference) in our case 'recipes'
getDocs(colRef)//get collection data
    .then((snapshot) => {
        console.log(snapshot.docs);
    })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
