import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {readModel} from './js/readModel.js'
import firebase from './js/firebase.js';

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    const  model= readModel();
    ReactDOM.render(<App model={model}/>, document.getElementById("root"))
  } else {
      window.location='login.html'

}});
