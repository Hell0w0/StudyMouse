import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = ({
  apiKey: "AIzaSyBQgAGR2jgG52DT_iMMKAYV87UowWabkHQ",
  authDomain: "studymouse-c539a.firebaseapp.com",
  databaseURL: "https://studymouse-c539a.firebaseio.com",
  projectId: "studymouse-c539a",
  storageBucket: "studymouse-c539a.appspot.com",
  messagingSenderId: "503177314168",
  appId: "1:503177314168:web:1ad9e4e406fd19f474128d"
})


// This must run before any other firebase functions
firebase.initializeApp(config)


export default firebase
