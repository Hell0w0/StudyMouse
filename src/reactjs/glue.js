import React from 'react';
import firebase from './../js/firebase.js';
import useModelProp from './useModelProp.js';
import CalendarSource from '../js/calendarSource.js';
import ModelContext from './modelContext.js';
import CanvasSource from '../js/canvasSource.js';
import usePromiseJSON from './usePromiseJSON.js';
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
  const currentCourse = useModelProp(model, "currentCourse");
  const index = model.getCourseIndex(currentCourse);
  const comments = useModelProp(model, "comments");
  const [invalidCommentName,setInvalidCommentName] = React.useState(false);
  const [commentName,setCommentName] = React.useState(null);
  //SidebarDeadlines
  const [deadlineName,setDeadlineName]= React.useState("");
  const [date,setDate]= React.useState("");
  const [courseType,setCourseType]= React.useState(courses[0]);
  const [sidebarType,setSidebarType]= React.useState("All");
  const [invalidDate,setInvalidDate]= React.useState(true);
  const [invalidDeadlineName,setInvalidDeadlineName]= React.useState(true);
  const [noCourses,setNoCourses] = React.useState(false);
  const [latestDeadline,setLatestDeadline] = React.useState([]);
  const [deadlineIndex,setDeadlineIndex]=React.useState(-1)

  //Reactfunctions for SidebarDeadlines
  /* Makes sure courseType is updated when currentcourse is chnaged*/
      React.useEffect(function(){
        if (currentCourse!==null && currentCourse!==courseType)
         setCourseType(currentCourse);
      }, [currentCourse]);

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
      deadlines.forEach(ele=>ele.forEach(elem=>{
        if(elem[2]<today){
          model.removeDeadline(elem);
        }
      }))
    });

  //Functions
React.useEffect(function(){
  if (window.location.hash!=="#course")
      model.setCurrentCourse(null)
},[window.location.hash])


  //CourseInfo
  if (currentCourse === null && window.location.hash==="#course"){
  window.location.hash="#courses";
  return false};

  //SidebarDeadlines
  let today = new Date().toISOString().slice(0, 10)

return h(View, {
  //Sidebar
  moveCourses:()=> {window.location.hash="#courses";},
  moveHome:()=> {window.location.hash="#home";},

  currentIndex:()=>{
    let currentIndex=0;
    if (window.location.hash === "#courses") {currentIndex = 1;}
    else if (window.location.hash === "#settings") {
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
  remove:(e)=>{  model.removeCourse(e)},
  onCreateCourse:()=>{setLatest(name);model.addCourse(name)},
  latest:latest,
  goTo:(course)=>{model.setCurrentCourse(course); window.location.hash="#course";},
  //CourseInfo
  currentCourse:currentCourse,
  index:index,
  comments:comments,
  deadlinesInfo:deadlines[index],
  onTextComment:(nam)=>{
      setCommentName(nam);
      if(comments!==undefined){
      comments.forEach(ele=>{
      if(ele[0]===nam)
      setInvalidCommentName(true);
        }
      )}},
  invalidCommentName:invalidCommentName,
  onRemoveComment:(e)=>{model.removeComment(e)},
  onCreateComment:()=>{model.addComment(commentName,currentCourse===null?courseType:currentCourse);setInvalidCommentName(false)},
  onCheck:(value)=>model.checkBox(value),
  nav:()=>{window.location.hash="#courses";},
  //SidebarDeadlines
  noCourses:noCourses,
  courseType:courseType,
  type:sidebarType,
  deadlineIndex:deadlineIndex,
  deadlines:deadlines,
  onCreate:()=>{
   model.addDeadline(courseType,deadlineName,date);
   setLatestDeadline([courseType,deadlineName,date])
   setDate("");
   setDeadlineName("");
   setInvalidDeadlineName(true);
   setInvalidDate(true);
   CalendarSource.handleClientLoad();
  },
  onCourseType:cou=>{setCourseType(cou)},
  onType: tp =>{setSidebarType(tp);setDeadlineIndex(model.getCourseIndex(tp))},
  onRemove:e=>{console.log("delete deadline");model.removeDeadline(e)},
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
  latestDeadline:latestDeadline,
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

const GlueToSetting=(View)=>{
  const model=React.useContext(ModelContext);
  const [promise, setPromise]= React.useState(CanvasSource.getCourses());
  const [data, error]= usePromiseJSON(promise);
  const [promiseF, setPromiseF]= React.useState(CanvasSource.getFavouriteCourses());
  const [dataF, errorF]= usePromiseJSON(promiseF);
  const [key, setKey] = React.useState("");
  const [open, setOpen] = React.useState(false);

  return h(View, {
      updateCourses:()=> {
        if(data!=null){
          data.forEach(obj=>model.addCourse(obj.name))}
          window.location.hash="#courses"
      },
      updateFavouriteCourses:()=> {
        if(dataF!=null){
          dataF.forEach(obj=>model.addCourse(obj.name))
        }
        window.location.hash="#courses"

      },
      setDefaultSource:()=>{
        setPromise(CanvasSource.getCourses());
        setPromiseF(CanvasSource.getFavouriteCourses())},
      setCustomSource:()=>{
        setPromise(CanvasSource.customGetCourses(key));
        setPromiseF(CanvasSource.customGetFavouriteCourses(key))},
      setKey:(input)=>{setKey(input)}
    })
}
export {GlueToSetting};
