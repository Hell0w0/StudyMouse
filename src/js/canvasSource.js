import {CANVAS_API_DOMAIN} from './apiConfig.js';
import {CANVAS_API_TOKEN} from './apiConfig.js';
const proxyUrl = "https://cors-anywhere.herokuapp.com/";

const CanvasSource={
  apiCall(url){
    return fetch(proxyUrl+url,{
      "method":"GET",
      'uri': proxyUrl+url,
      'json': true,
      'resolveWithFullResponse': true,
      'headers': {
        'Authorization': 'Bearer ' + CANVAS_API_TOKEN
      }
    })
    .then(  (response)=>{
        if(response.ok)
          return response;
        throw Error(response.statusText);
      }
    )
    .then(response => response.text());
  },

  getSelf(){
    return this.apiCall(CANVAS_API_DOMAIN + "/users/self")
    .then(data=>data)
  },

  getCourses(){
    return this.apiCall(CANVAS_API_DOMAIN + "/courses")
    .then(data=>data)
  },

  getFavouriteCourses(){
    return this.apiCall(CANVAS_API_DOMAIN + "/users/self/favorites/courses")
    .then(data=>data)
  },

  customAPICall(url, CUSTOM_API_KEY){
    return fetch(proxyUrl+url,{
      "method":"GET",
      'uri': proxyUrl+url,
      'json': true,
      'resolveWithFullResponse': true,
      'headers': {
        'Authorization': 'Bearer ' + CUSTOM_API_KEY
      }
    })
    .then(  (response)=>{
        if(response.ok)
          return response;
        throw Error(response.statusText);
      }
    )
    .then(response => response.text());
  },

  customGetSelf(CUSTOM_API_KEY){
    return this.apiCall(CANVAS_API_DOMAIN + "/users/self", CUSTOM_API_KEY)
    .then(data=>data)
  },

  customGetCourses(CUSTOM_API_KEY){
    return this.apiCall(CANVAS_API_DOMAIN + "/courses", CUSTOM_API_KEY)
    .then(data=>data)
  },

  customGetFavouriteCourses(CUSTOM_API_KEY){
    return this.apiCall(CANVAS_API_DOMAIN + "/users/self/favorites/courses", CUSTOM_API_KEY)
    .then(data=>data)
  }
}

export default CanvasSource;
