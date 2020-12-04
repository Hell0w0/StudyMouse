import {GOODREADS_API_KEY} from './apiConfig.js';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const controller = new AbortController();


export const BookSource={
  apiCall(url){
    return fetch(proxyUrl+url,{
      "method":"GET",
      signal: controller.signal
    })
    .then(  (response)=>{
        if(response.ok)
          return response;
        throw Error(response.statusText);
      }
    )
    .then(response => response.text());
    controller.abort();
  },

  searchBooks(query){
    return this.apiCall("https://www.goodreads.com/search/index.xml?key="+GOODREADS_API_KEY+"&q="+query)
    .then(data=>data)
  }
}
