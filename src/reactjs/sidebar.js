import React from 'react';
import ReactDOM from 'react-dom';
import {SidebarView} from './../js/views/sidebarView.js';
import firebase from './../js/firebase.js';
import CanvasSource from '../js/canvasSource.js';
import usePromiseJSON from './usePromiseJSON.js';
import promiseNoData from '../js/views/promiseNoData.js';

export function Sidebar({model,moveCourses}) {
  const h= React.createElement;
  const [promise, setPromise]= React.useState(CanvasSource.getCourses());
  const [data, error]= usePromiseJSON(promise);
  let currentIndex=1;

  if (window.location.hash == "#courses") {
    currentIndex = 1;
  }
  else if (window.location.hash == "#settings") {
    currentIndex = 3;
  }
  else{
    currentIndex = null;
  }

return h(SidebarView, {
moveCourses:moveCourses,
currentIndex:currentIndex,
username:firebase.auth().currentUser.displayName,
userimage:firebase.auth().currentUser.photoURL,
logOut:()=>{logOut()},
canvasCourses:()=>{
  if(data!=null){
    data.forEach(obj=>model.addCourse(obj.name))
  }
}
})
}

function logOut(){
  firebase.auth().signOut().then(() => {
            console.log("+")
          }, function (error) {
            console.log("-")
          });
}
