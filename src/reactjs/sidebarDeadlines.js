import {SidebarDeadlinesView} from '../js/views/sidebarDeadlinesView.js';
import React from 'react';
import useModelProp from './useModelProp.js';


 export default function SidebarDeadlines({model,err}) {
   const [open, setOpen] = React.useState(false);
   const coursesList = useModelProp(model,"courses");
   const deadlines = useModelProp(model,"deadlines");
   const currentCourse = useModelProp(model,"currentCourse");
   const [sidebarType,setSidebarType] = React.useState("All");
   const h= React.createElement;

    /*Const from create deadline*/

  let today = new Date().toISOString().slice(0, 10)
   const [name,setName]= React.useState("");
   const [date,setDate]= React.useState("");
   const [courseType,setCourseType]= React.useState(currentCourse ? currentCourse : coursesList[0]);
   const [invalidDate,setInvalidDate]= React.useState(true);
   const [invalidName,setInvalidName]= React.useState(true);


    /* Updates the sidebar deadlineList based on chosen Course*/

 // Getcourseindex return -1 if name == All
   function getCourses() {
     const index = model.getCourseIndex(sidebarType);
     if (index >= 0 && deadlines[index].length>0) return deadlines[index];
     else if (index >=0) { return undefined};
     return model.getAllDeadlines();
   }

      const [deadlinesList, setDeadlinesList] = React.useState(getCourses());


return h(SidebarDeadlinesView, {
handleClose:()=>setOpen(false),
today:today,
handleClickOpen:()=>setOpen(true),
handleCloseAdd:()=>{setOpen(false);model.addDeadline(name,date,courseType)},
open:open,
onRemove:(e)=>model.removeDeadline(e),
onName:(nam)=> {
  if (nam!=""){
  setInvalidName(false);
  setName(nam)}},
onDate:(dat)=> {
  if (ValidateDate(dat,today)) {
    setInvalidDate(false);
    setDate(dat)}},
onCourseType:(cou)=>setCourseType(cou),
onType: type => setSidebarType(type),
type:courseType,
deadlines:deadlinesList,
courses:coursesList,
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
