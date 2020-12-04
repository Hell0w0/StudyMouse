import {CourseView} from './../js/views/courseView.js';
import useModelProp from './useModelProp.js';
import React from 'react';

export default function Course({model,viewNav}) {
  const [name,setName] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [invalidName,setInvalidName]=React.useState(false)
  const h= React.createElement;
  const courses = useModelProp(model, "courses");


  return h(CourseView, {
  onText:(nam)=> {setName(nam);courses.forEach(ele=>{
    if(ele==name){
    setInvalidName(true)}})},
  addCourse:()=> {model.addCourse(name)},
  courses:courses,
  invalidName:invalidName,
  remove:(e)=>{model.removeCourse(e)},
  handleClose:()=>setOpen(false),
  handleClickOpen:()=>setOpen(true),
  handleCloseAdd:()=>{setOpen(false);model.addCourse(name)},
  open:open,
  goTo:(course)=>{model.setCurrentCourse(course); viewNav()},
  });
  }
