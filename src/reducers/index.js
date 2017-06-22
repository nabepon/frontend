// @flow
import { combineReducers } from 'redux';
import counter from './counter';
import sample from './sample';
import billings from './billings';

export default combineReducers({
  counter,
  sample,
  billings,
});
