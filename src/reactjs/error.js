import {CustomErrorView} from './../js/views/errorView.js';
import React from 'react';

export function CustomError({home}) {
  const h= React.createElement;

return h(CustomErrorView, {
onHome:()=>{home()}});
}
