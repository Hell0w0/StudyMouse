import React from 'react';
import ReactDOM from 'react-dom';
import "firebase/auth";
import firebase from './js/firebase.js';



firebase.initializeApp({
  apiKey: "AIzaSyBQgAGR2jgG52DT_iMMKAYV87UowWabkHQ",
  authDomain: "studymouse-c539a.firebaseapp.com",
  databaseURL: "https://studymouse-c539a.firebaseio.com",
  projectId: "studymouse-c539a",
  storageBucket: "studymouse-c539a.appspot.com",
  messagingSenderId: "503177314168",
  appId: "1:503177314168:web:1ad9e4e406fd19f474128d"
})


// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: 'index.html#home',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

var user = firebase.auth().currentUser;
if(user){
  window.location.hash = '#home';

} else{
  ui.start('#firebaseui-auth-container', uiConfig);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
