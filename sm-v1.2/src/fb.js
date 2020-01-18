import firebase from 'firebase/app'
import 'firebase/firestore'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCVwKYgtPfkwhRFl1L85hZUSZygLP6cm1Q",
    authDomain: "spartan-mule-v1-2.firebaseapp.com",
    databaseURL: "https://spartan-mule-v1-2.firebaseio.com",
    projectId: "spartan-mule-v1-2",
    storageBucket: "spartan-mule-v1-2.appspot.com",
    messagingSenderId: "393055713192",
    appId: "1:393055713192:web:a12d4edf12d2e4b15dcf9d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export default db;