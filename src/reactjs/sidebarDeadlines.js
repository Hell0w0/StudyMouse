import {SidebarDeadlinesView} from '../js/views/sidebarDeadlinesView.js';
import GlueToModel from './glue.js'

function SidebarDeadlines(){
  return GlueToModel(SidebarDeadlinesView);
}
export default SidebarDeadlines;
