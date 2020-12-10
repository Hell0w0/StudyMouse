import {StudyModel} from './studyModel.js';
import firebase from './firebase.js';

export function readModel(){
  var user = firebase.auth().currentUser;
  const model = new StudyModel();
  model.updateModel(user.uid);
  return model;
}
