import React from 'react';
import ReactDOM from 'react-dom';

function usePromise(promise) {
  const [data, setData]= React.useState(null);
  const [error, setError]=React.useState(null);
  React.useEffect(()=>{
     setData(null);
     setError(null);
  if (promise!=null){
       promise.then(data=>{
         const xmlString = data;
         var XmlNode = new DOMParser().parseFromString(xmlString, 'text/xml');
         data = xmlToJson(XmlNode).GoodreadsResponse.search.results.work;
         setData(data)
       })
       .catch(error=>setError(error));
     }
  else{
    return undefined;
  }
}, [promise]);
  return[data,error];
}

function xmlToJson(xml) {

	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

export default usePromise;
