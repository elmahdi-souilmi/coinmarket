import firebase from '@firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
  apiKey: "AIzaSyCcjnSYJvHAQfQt8suPh9KCOy4t3i4P-T8",
    authDomain: "cryptomoney-feb43.firebaseapp.com",
    projectId: "cryptomoney-feb43",
    storageBucket: "cryptomoney-feb43.appspot.com",
    messagingSenderId: "315917968384",
    appId: "1:315917968384:web:ebe3b3bafe19d09b6fa4e5"
  };

// Initialize Firebase
firebase.initializeApp(config);



export default firebase