import React from 'react';
import ReactDOM from 'react-dom';
import {SidebarView} from './../js/views/sidebarView.js';
import firebase from './../js/firebase.js';

export function Sidebar({model,moveHome,moveCourses,moveBooks}) {
  const h= React.createElement;
  let currentIndex=0;
  if (window.location.hash =="#home"){
    currentIndex = 0;
  }
  else if (window.location.hash == "#courses") {
    currentIndex = 1;
  }
  else{
    currentIndex = null;
  }
return h(SidebarView, {
moveHome:moveHome,
moveCourses:moveCourses,
moveBooks:moveBooks,
currentIndex:currentIndex,
logOut:()=>{logOut()}
})
}

function logOut(){
  firebase.auth().signOut().then(() => {
            console.log("+")
          }, function (error) {
            console.log("-")
          });
}
