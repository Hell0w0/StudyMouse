import {CustomErrorView} from './../js/views/errorView.js';
import GlueToModel from './glue.js'

function CustomError(){
  return GlueToModel(CustomErrorView);
}
export default CustomError;
