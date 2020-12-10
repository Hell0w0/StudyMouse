import {SettingsView} from './../js/views/settingsView.js';
import useModelProp from './useModelProp.js';
import React from 'react';
import CanvasSource from '../js/canvasSource.js';
import usePromiseJSON from './usePromiseJSON.js';
import promiseNoData from '../js/views/promiseNoData.js';

function Settings({model}){
  const h= React.createElement;
  const [promise, setPromise]= React.useState(CanvasSource.getCourses());
  const [data, error]= usePromiseJSON(promise);
  const [promiseF, setPromiseF]= React.useState(CanvasSource.getFavouriteCourses());
  const [dataF, errorF]= usePromiseJSON(promiseF);
  const [key, setKey] = React.useState("");
  const [open, setOpen] = React.useState(false);


return h(SettingsView, {
    handleClose:()=>setOpen(false),
    handleClickOpen:()=>setOpen(true),
    open:open,
    updateCourses:()=> {
      if(data!=null){
        data.forEach(obj=>model.addCourse(obj.name))
      }
    },
    updateFavouriteCourses:()=> {
      if(dataF!=null){
        dataF.forEach(obj=>model.addCourse(obj.name))
      }
    },
    setDefaultSource:()=>{
      setOpen(false);
      setPromise(CanvasSource.getCourses());
      setPromiseF(CanvasSource.getFavouriteCourses())},
    setCustomSource:()=>{
      setOpen(false);
      setPromise(CanvasSource.customGetCourses(key));
      setPromiseF(CanvasSource.customGetFavouriteCourses(key))},
    setKey:(input)=>{setKey(input)}
  })
}

export default Settings;
