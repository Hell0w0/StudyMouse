import {CourseView} from './../js/views/courseView.js';
import GlueToModel from './glue.js'

function Course(){
  return GlueToModel(CourseView);
}
export default Course;
