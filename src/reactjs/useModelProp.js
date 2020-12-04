import React from 'react';

export default function useModelProp(model, prop) {
    const [propValue, setPropValue]= React.useState(model[prop]);
    React.useEffect(function(){
       const obs= ()=>setPropValue(model[prop]);
       model.addObserver(obs)
       return()=>model.removeObserver(obs);
    }, [model, prop]);
    return propValue;
}
