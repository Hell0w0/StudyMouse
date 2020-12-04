import {StudyModel} from './studyModel.js';
import firebase from './firebase.js';

export function readModel(){
  var user = firebase.auth().currentUser;
  const model = new StudyModel();
  model.updateModel(user.uid);
  model.addObserver(() => setDB(user.uid, model));
  return model;
}
function setDB(userId, model){
  let modelObject = JSON.stringify(model);
  firebase.database().ref('users/' + userId).set({
    study_model: modelObject
  });
}
