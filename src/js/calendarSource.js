/* global gapi */

import {API_KEY} from './apiConfig.js';
import {CLIENT_ID} from './apiConfig.js';
import {readModel} from './readModel.js';

const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar";

const CalendarSource={
  handleClientLoad(){
    gapi.load('client:auth2', initClient);
  }
}

var initClient=(function(){
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
  // Listen for sign-in state changes.
  gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
  // Handle the initial sign-in state.
  updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
}, (error)=> {
  console.log(JSON.stringify(error, null, 2))
});
})

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    updateCalender();
  }
  else{
    gapi.auth2.getAuthInstance().signIn();
  }
}

function  updateCalender() {
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,    'maxResults': 100,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;
    var eventSummary=[];
    if (events.length > 0) {
      var i = 0;
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        eventSummary =[event.summary, ...eventSummary]
        eventSummary =[event.start.dateTime, ...eventSummary]
        eventSummary =[event.description, ...eventSummary]
      }
    }
    const model = readModel();
    var deadlines = model.getAllDeadlines();
    deadlines.forEach(item => {
      if(item[0]!=null&&item[1]!=null&&item[2]!=null){
      var newEvent = createEvent(item[1], item[2], item[0]);
      if(!(eventSummary.includes(newEvent.summary)&&eventSummary.includes(newEvent.description)&&eventSummary.includes(newEvent.start.dateTime))){
        postEvent(newEvent);
      }
    }
    })

  });
}
function createEvent(name, date, course){
  var event = {
    'summary': name,
    'colorId': "10",
    'description': course,
    'start': {
      'dateTime': date+'T09:00:00+01:00',
      'timeZone': 'Europe/Stockholm'
    },
    'end': {
      'dateTime': date+'T17:00:00+01:00',
      'timeZone': 'Europe/Stockholm'
    }
  }
  return event;
}

function postEvent(event){
  var request = gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': event
  });

  request.execute(function(event) {
    console.log('Event created: ' + event.htmlLink + '\n');
  });
}

export default CalendarSource;
