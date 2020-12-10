import {SidebarDeadlinesView} from '../js/views/sidebarDeadlinesView.js';
import React from 'react';
import useModelProp from './useModelProp.js';
import CalendarSource from '../js/calendarSource.js';

export default function SidebarDeadlines({model,err}) {
  const coursesList = useModelProp(model,"courses");
  const deadlines = useModelProp(model,"deadlines");
  const currentCourse = useModelProp(model,"currentCourse");
  const [name,setName]= React.useState("");
  const [date,setDate]= React.useState("");
  const [courseType,setCourseType]= React.useState(coursesList[0]);
  const [sidebarType,setSidebarType]= React.useState("All");
  const [invalidDate,setInvalidDate]= React.useState(true);
  const [invalidName,setInvalidName]= React.useState(true);
  const [noCourses,setNoCourses] = React.useState(false);
  const h= React.createElement;
   /*Const from create deadline*/

 let today = new Date().toISOString().slice(0, 10)

/* Makes sure courseType is updated when currentcourse is chnaged*/
    React.useEffect(function(){
      if (currentCourse!=null && currentCourse!=courseType)
       setCourseType(currentCourse);
    }, [currentCourse]);

    React.useEffect(function(){
      setCourseType(coursesList[0]);
    },[coursesList[0]])


    React.useEffect(function(){
      if (coursesList.length==0)
        setNoCourses(true);
      else {
        setNoCourses(false);
      }
    },[coursesList])

 // Getcourseindex return -1 if name == All
   function getCourses() {
     const index = model.getCourseIndex(sidebarType);
     if (index >= 0) return deadlines[index];
     let allDeadline=model.getAllDeadlines();
     return allDeadline
   }

  const [deadlinesList, setDeadlinesList] = React.useState(getCourses());
  React.useEffect(function(){
     setDeadlinesList(getCourses());
  }, [deadlines,sidebarType]);


return h(SidebarDeadlinesView, {
noCourses:noCourses,
courseType:courseType,
type:sidebarType,
deadlines:deadlinesList,
courses:coursesList,
onCreate:()=>{
 model.addDeadline(name,date,courseType);
 setDate("");
 setName("");
 setInvalidName(true);
 setInvalidDate(true);
 CalendarSource.handleClientLoad();
},
onCourseType:cou=>setCourseType(cou),
onType: tp =>setSidebarType(tp),
onRemove:e=>model.removeDeadline(e),
onName:(nam)=> {
 if (nam!=""){
 setInvalidName(false);
 setName(nam)}},
onDate:(dat)=> {
 if (ValidateDate(dat,today)) {
   setInvalidDate(false);
   setDate(dat)}},
today:today,
invalidName:invalidName,
invalidDate:invalidDate,
});
}
function ValidateDate(dt,today){
 const striptoday=today.split("-")
 const stripdt= dt.split("-");
 const year = stripdt[0];
 if (year>=striptoday[0] && year.length==4){
 if (today<=dt){
   return true
 }}
 else{
 return false;}
}
