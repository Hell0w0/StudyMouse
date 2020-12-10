import {CourseInfoView} from './../js/views/courseInfoView.js';
import useModelProp from './useModelProp.js';
import React from 'react';

export default function CourseInfo({model,coursesNav,errorNav}) {
  const courseName = useModelProp(model, "currentCourse");
  const index = model.getCourseIndex(courseName);
  const commentsList = useModelProp(model, "comments");
  const [invalidName,setInvalidName] = React.useState(false);
  const [name,setName] = React.useState(null);
  const h= React.createElement;


if (courseName == null){
errorNav()
return false
 };

        /*Moves checked items to bottom of list.*/

  let comments = commentsList[index];
  let checked=[];
  let unChecked=[];

  comments.forEach(ele=>{
    if (ele[1]===true){
      checked.push(ele);
    }
    else{
      unChecked.push(ele);
    }
  });

return h(CourseInfoView, {
  name:courseName,
  checked:checked,
  unChecked:unChecked,
  onText:(nam)=>{
      comments.forEach(ele=>{
      if(ele===nam)
      setInvalidName(true)
      else{
        setInvalidName(false)
        setName(nam)}
      })},
  invalidName:invalidName,
  onRemove:(e)=>model.removeComment(e),
  onCreate:()=>model.addComment(name),
  onCheck:(value)=>model.checkBox(value),
  nav:coursesNav});
}
