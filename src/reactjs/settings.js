import {SettingsView} from './../js/views/settingsView.js';
import {GlueToSetting} from './glue.js'

function Settings(){
  return GlueToSetting(SettingsView);
}
export default Settings;
