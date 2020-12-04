import {CourseInfoView} from './../js/views/courseInfoView.js';
import useModelProp from './useModelProp.js';
import React from 'react';

export default function CourseInfo({model,coursesNav,errorNav}) {
  const courseName = useModelProp(model, "currentCourse");
  const index = model.getCourseIndex(courseName);
  const [open, setOpen] = React.useState(false);
  const commentsList = useModelProp(model, "comments");

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
    if (ele[1]==true){
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
  onText:(nam)=> setName(nam),
  onRemove:(e)=>model.removeComment(e),
  handleClose:()=>setOpen(false),
  handleClickOpen:()=>setOpen(true),
  handleCloseAdd:()=>{setOpen(false);model.addComment(name)},
  open:open,
  onCheck:(value)=>model.checkBox(value),
  nav:coursesNav});
}