import {SettingsView} from './../js/views/settingsView.js';
import React from 'react';
import CanvasSource from '../js/canvasSource.js';
import usePromiseJSON from './usePromiseJSON.js';
import ModelContext from './modelContext.js';

function Settings(){
  const model=React.useContext(ModelContext);
  const h= React.createElement;
  const [promise, setPromise]= React.useState(CanvasSource.getCourses());
  const [data, error]= usePromiseJSON(promise);
  const [promiseF, setPromiseF]= React.useState(CanvasSource.getFavouriteCourses());
  const [dataF, errorF]= usePromiseJSON(promiseF);
  const [key, setKey] = React.useState("");
  const [open, setOpen] = React.useState(false);


return h(SettingsView, {
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

export default Settings;
