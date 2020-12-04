import React from 'react';

function Show({hash, children}){
  const [, setRoute]= React.useState(window.location.hash);
  React.useEffect(()=>{
    window.addEventListener("hashchange",()=> {setRoute({})})
   return()=>window.removeEventListener("hashchange",()=>setRoute({}))},
   []);
  return hash===window.location.hash?children: false;
}

export default Show
