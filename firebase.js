import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBVlwxZgXog-2cSCRSTo6SyS3QNJEmpMcs",
    authDomain: "trin--clone.firebaseapp.com",
    projectId: "trin--clone",
    storageBucket: "trin--clone.appspot.com",
    messagingSenderId: "1060686916730",
    appId: "1:1060686916730:web:b2a20799ab7f64d7a6dfc3"
  };

/* Initialize Firebase on frontend: */
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

/* Alias the database connection: */
const db = app.firestore();
export default db;

/* const provider = new firebase.auth.FacebookAuthProvider(); */