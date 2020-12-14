import React from 'react';

function usePromiseJSON(promise) {
  const [data, setData]= React.useState(null);
  const [error, setError]=React.useState(null);
  React.useEffect(()=>{
     setData(null);
     setError(null);
  if (promise!=null){
       promise.then(data=>{setData(JSON.parse(data)); console.log("API data loaded")}).catch(error=>setError(error));
     }
  else{
    return undefined;
  }
}, [promise]);
  return[data,error];
}

export default usePromiseJSON;
