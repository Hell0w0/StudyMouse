import {HomeView} from '../js/views/homeView.js';
import GlueToModel from './glue.js'

function Home(){
  return GlueToModel(HomeView);
}
export default Home;
