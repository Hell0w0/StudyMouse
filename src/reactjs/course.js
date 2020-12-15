import {CourseView} from './../js/views/courseView.js';
import useModelProp from './useModelProp.js';
import React from 'react';

export default function Course({model,viewNav}) {
  const [name,setName] = React.useState(null);
  const [invalidName,setInvalidName]=React.useState(false)
  const h= React.createElement;
  const courses = useModelProp(model, "courses");
  const [latest,setLatest] = React.useState("");
  return h(CourseView, {
  onText:(nam)=> {setName(nam);
    courses.forEach(ele=>{
    if(ele===nam){
    setInvalidName(true)}
    else{
      setInvalidName(false)
    }
  })},
  onCreate:()=> {model.addCourse(name)},
  courses:courses,
  latest:latest,
  name:name,
  invalidName:invalidName,
  remove:(e)=>{  model.removeCourse(e)},
  onCreate:()=>{model.addCourse(name);setLatest(name)},
  goTo:(course)=>{model.setCurrentCourse(course); viewNav()}
  });
  }
