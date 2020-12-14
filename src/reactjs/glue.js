import React from 'react';
import firebase from './../js/firebase.js';
import useModelProp from './useModelProp.js';
import CalendarSource from '../js/calendarSource.js';
import ModelContext from './modelContext.js';
const h= React.createElement;

const GlueToModel= (View)=>
{
  const model=React.useContext(ModelContext);
  //Course
  const [name,setName] = React.useState(null);
  const [invalidName,setInvalidName]=React.useState(false)
  const courses = useModelProp(model, "courses");
  const deadlines = useModelProp(model,"deadlines");
  const [latest,setLatest] = React.useState("");

  //Courseinfo
  const courseName = useModelProp(model, "currentCourse");
  const index = model.getCourseIndex(courseName);
  const commentsList = useModelProp(model, "comments");
  const [invalidCourseInfoName,setInvalidCourseInfoName] = React.useState(false);
  const [courseInfoName,setCourseInfoName] = React.useState(null);

  //SidebarDeadlines
  const [deadlineName,setDeadlineName]= React.useState("");
  const [date,setDate]= React.useState("");
  const [courseType,setCourseType]= React.useState(courses[0]);
  const [sidebarType,setSidebarType]= React.useState("All");
  const [invalidDate,setInvalidDate]= React.useState(true);
  const [invalidDeadlineName,setInvalidDeadlineName]= React.useState(true);
  const [noCourses,setNoCourses] = React.useState(false);
  const [deadlinesList, setDeadlinesList] = React.useState([]);

  //Reactfunctions for SidebarDeadlines
  /* Makes sure courseType is updated when currentcourse is chnaged*/
      React.useEffect(function(){
        if (courseName!==null && courseName!==courseType)
         setCourseType(courseName);
      }, [courseName]);

      React.useEffect(function(){
        setCourseType(courses[0]);
      },[courses[0]])


      React.useEffect(function(){
        if (courses.length===0)
          setNoCourses(true);
        else {
          setNoCourses(false);
        }
      },[courses])

      React.useEffect(function(){
         setDeadlinesList(getCourses());
      }, [deadlines,sidebarType]);

  //Functions
  //CourseInfo
  if (courseName === null && window.location.hash==="#course"){
  window.location.hash="#courses";
  return false};
  /*Moves checked items to bottom of list.*/
  let comments = commentsList[index];
  let checked=[];
  let unChecked=[];
  if(comments!==undefined){
    comments.forEach(ele=>{
    if (ele[1]===true){
      checked.push(ele);
    }
    else{
      unChecked.push(ele);
    }
  });}
  //SidebarDeadlines
  let today = new Date().toISOString().slice(0, 10)

  // Getcourseindex return -1 if name == All
   function getCourses() {
     const index = model.getCourseIndex(sidebarType);
     if (index >= 0) return deadlines[index];
     let allDeadline=model.getAllDeadlines();
     return allDeadline
   }


return h(View, {
  //Sidebar
  moveCourses:()=> {window.location.hash="#courses";},
  currentIndex:()=>{
    let currentIndex=0;
    if (window.location.hash === "#courses") {currentIndex = 1;}
    else if (window.location.hash == "#settings") {
      currentIndex = 3;
    }
    else{currentIndex = null;}},
  username:firebase.auth().currentUser.displayName,
  userimage:firebase.auth().currentUser.photoURL,

  logOut:()=>{
    firebase.auth().signOut().then(() => {
      console.log("+")
    }, function (error) {
      console.log("-")
    });
  },
  canvasCourses:()=>{window.location.hash="#settings";},
  //Course
  onTextCourse:(nam)=> {setName(nam);
    courses.forEach(ele=>{
    if(ele===nam){
    setInvalidName(true)}
    else{
      setInvalidName(false)
    }
  })},
  addCourse:()=> {model.addCourse(name)},
  courses:courses,
  invalidNameCourse:invalidName,
  courseName:courseName,
  remove:(e)=>{  model.removeCourse(e)},
  onCreateCourse:()=>{setLatest(name);debugger;model.addCourse(name)},
  latest:latest,
  goTo:(course)=>{model.setCurrentCourse(course); window.location.hash="#course";},
  //CourseInfo
  name:courseName,
  checked:checked,
  unChecked:unChecked,
  onTextCourseInfo:(nam)=>{
      setCourseInfoName(nam);
      if(comments!==undefined){comments.forEach(ele=>{
      if(ele[0]===nam)
      setInvalidCourseInfoName(true);
      else{
        setInvalidCourseInfoName(false);
        }
      })}},
  invalidNameCourseInfo:invalidCourseInfoName,
  onRemoveCourseInfo:(e)=>model.removeComment(e),
  onCreateCourseInfo:()=>model.addComment(courseInfoName),
  onCheck:(value)=>model.checkBox(value),
  nav:()=>{window.location.hash="#courses";},
  //SidebarDeadlines
  noCourses:noCourses,
  courseType:courseType,
  type:sidebarType,
  deadlines:deadlinesList,
  onCreate:()=>{
   model.addDeadline(deadlineName,date,courseType);
   setDate("");
   setDeadlineName("");
   setInvalidDeadlineName(true);
   setInvalidDate(true);
   CalendarSource.handleClientLoad();
  },
  onCourseType:cou=>setCourseType(cou),
  onType: tp =>setSidebarType(tp),
  onRemove:e=>model.removeDeadline(e),
  onName:(nam)=> {
   if (nam!==""){
   setInvalidDeadlineName(false);
   setDeadlineName(nam)}
 else{setInvalidDeadlineName(true)}},
  onDate:(dat)=> {
   if (ValidateDate(dat,today)) {
     setInvalidDate(false);
     setDate(dat)}
   else{setInvalidDate(true)}},
  today:today,
  date:date,
  invalidDeadlineName:invalidDeadlineName,
  invalidDate:invalidDate,
}
);

function ValidateDate(dt,today){
 const striptoday=today.split("-")
 const stripdt= dt.split("-");
 const year = stripdt[0];
 if (year>=striptoday[0] && year.length==4){
   return true
 }
 else{
 return false;}}
}
export default GlueToModel;
