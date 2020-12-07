import React from 'react';
import firebase from './js/firebase.js';
import {Sidebar} from './reactjs/sidebar.js';
import Show from './reactjs/show.js';
import Home from './reactjs/home.js';
import Course from './reactjs/course.js';
import CourseInfo from './reactjs/courseInfo.js';
import SidebarDeadlines from './reactjs/sidebarDeadlines.js';
import {CustomError} from './reactjs/error.js';


const App = ({model}) =>

<div>

  <div><Sidebar model={model} moveHome={homeNav} moveCourses={coursesNav} moveBooks={bookNav}/></div>

  <Show hash="#home" ><div><Home model={model}/></div></Show>
  <Show hash="#courses" ><div><Course model={model} viewNav={viewNav}/></div></Show>
  <Show hash="#course" ><div><CourseInfo model={model} coursesNav={coursesNav} errorNav={errNav}/></div></Show>
  <Show hash="#error" ><div><CustomError home={homeNav}/></div></Show>
  <div><SidebarDeadlines model={model} err={errNav}/></div>

</div>


window.addEventListener("hashchange",()=> {defaultRoute()})

const viewNav=()=> window.location.hash="#course";
const bookNav=()=> window.location.hash="#home";
const coursesNav=()=> window.location.hash="#courses";
const errNav=()=> window.location.hash="#error";
const homeNav=()=> window.location.hash="#home";

defaultRoute();

export function defaultRoute(){
    if(!["#error","#course","#home","#createcomment","#createcommentoverview","#createdeadline","#createcourse", "#courses"].find(knownRoute=>
    knownRoute==window.location.hash))
	window.location.hash="#home";
}

export default App;
