import * as firebase from 'firebase/app'

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDe29ALkkuugUrjJJo7n8oXY0s4hILB0Fo",
    authDomain: "ekoty-a427d.firebaseapp.com",
    databaseURL: "https://ekoty-a427d.firebaseio.com",
    projectId: "ekoty-a427d",
    storageBucket: "ekoty-a427d.appspot.com",
    messagingSenderId: "894719711666",
    appId: "1:894719711666:web:cf3a31b88650734348ecab",
    measurementId: "G-LNLHGVSE9D"
};

let firebaseApp = firebase.initializeApp(firebaseConfig)

// ==== Firebase auth
export const firebaseAuth = firebaseApp.auth();


// ==== Firebase firestore db
export const db = firebaseApp.firestore();
db.enablePersistence()
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });
// Subsequent queries will use persistence, if it was enabled successfully
  

export const dbPalavras = db.collection("palavras");
export const dbconfiguracao = db.collection("configuracao");




// ==== Firebase file storage

export const fbStorage = firebase.storage
export const storageRef = firebase.storage().ref()
export const imagesUsers = firebase.storage().ref().child('usersImages');