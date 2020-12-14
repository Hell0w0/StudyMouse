import {CourseInfoView} from './../js/views/courseInfoView.js';
import GlueToModel from './glue.js'

function CourseInfo(){
  return GlueToModel(CourseInfoView);
}
export default CourseInfo;
