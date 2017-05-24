/* eslint-disable sort-imports */
import {combineReducers} from 'redux';
import navigationState from './navigationState.js';
import navigationType from './navigationType.js';

export default combineReducers({
  navigationState,
  navigationType,
});
