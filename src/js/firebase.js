import firebaseui from 'firebaseui'

const config = ({
  apiKey: "AIzaSyBQgAGR2jgG52DT_iMMKAYV87UowWabkHQ",
  authDomain: "studymouse-c539a.firebaseapp.com",
  databaseURL: "https://studymouse-c539a.firebaseio.com",
  projectId: "studymouse-c539a",
  storageBucket: "studymouse-c539a.appspot.com",
  messagingSenderId: "503177314168",
  appId: "1:503177314168:web:1ad9e4e406fd19f474128d"})

// This is our firebaseui configuration object
const uiConfig = ({
  signInSuccessUrl: '#home',
  signInOptions: [
    window.firebase.auth.EmailAuthProvider.PROVIDER_ID
    window.firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  tosUrl: '/terms-of-service' // This doesn't exist yet
})

// This must run before any other firebase functions
window.firebase.initializeApp(config)

// This sets up firebaseui
const ui = new firebaseui.auth.AuthUI(window.firebase.auth())

// This adds firebaseui to the page
// It does everything else on its own
const startFirebaseUI = function (elementId) {
  ui.start(elementId, uiConfig)
}

export startFirebaseUI
