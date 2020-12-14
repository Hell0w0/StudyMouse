import {SidebarView} from './../js/views/sidebarView.js';
import GlueToModel from './glue.js'

function Sidebar(){
  return GlueToModel(SidebarView);
}
export default Sidebar;
