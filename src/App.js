import React from 'react';
import {Sidebar} from './reactjs/sidebar.js';
import Show from './reactjs/show.js';
import Course from './reactjs/course.js';
import CourseInfo from './reactjs/courseInfo.js';
import SidebarDeadlines from './reactjs/sidebarDeadlines.js';



const App = ({model}) =>

<div>

  <div><Sidebar model={model} moveCourses={coursesNav}/></div>

  <Show hash="#courses" ><div><Course model={model} viewNav={viewNav}/></div></Show>
  <Show hash="#course" ><div><CourseInfo model={model} coursesNav={coursesNav}/></div></Show>
  <div><SidebarDeadlines model={model}/></div>

</div>

window.addEventListener("hashchange",()=> {defaultRoute()})

const viewNav=()=> window.location.hash="#course";
const coursesNav=()=> window.location.hash="#courses";

defaultRoute();

export function defaultRoute(){
    if(!["#course","#settings","#courses"].find(knownRoute=>
    knownRoute===window.location.hash))
	window.location.hash="#courses";
}

export default App;
