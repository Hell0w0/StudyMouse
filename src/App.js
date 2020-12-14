import React from 'react';
import Sidebar from './reactjs/sidebar.js';
import Show from './reactjs/show.js';
import Home from './reactjs/home.js';
import Course from './reactjs/course.js';
import CourseInfo from './reactjs/courseInfo.js';
import SidebarDeadlines from './reactjs/sidebarDeadlines.js';
import Settings from './reactjs/settings.js';
import CustomError from './reactjs/error.js';
import ModelContext from './reactjs/modelContext.js';

const App = ({model}) =>
<div>
  <ModelContext.Provider value={model}>
  <div><Sidebar/></div>
  <Show hash="#home" ><div><Home/></div></Show>
  <Show hash="#settings"><div><Settings/></div></Show>
  <Show hash="#courses" ><div><Course/></div></Show>
  <Show hash="#course" ><div><CourseInfo/></div></Show>
  <Show hash="#error" ><div><CustomError/></div></Show>
  <div><SidebarDeadlines/></div>
  </ModelContext.Provider>
</div>
window.addEventListener("hashchange",()=> {defaultRoute()})
defaultRoute();
export function defaultRoute(){
    if(!["#error","#course","#home","#createcomment","#createcommentoverview","#createdeadline","#createcourse", "#courses", "#settings"].find(knownRoute=>
    knownRoute===window.location.hash))
	window.location.hash="#home";
}

export default App;
