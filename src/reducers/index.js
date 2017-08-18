// @flow
import { combineReducers } from 'redux';
import counter from './counter';
import sample from './sample';

export default combineReducers({
  counter,
  sample,
});
