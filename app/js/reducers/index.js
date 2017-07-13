import { combineReducers } from 'redux';
import details from './details';
import users from './users';
import weeks from './weeks';

export default combineReducers({
  details,
  users,
  weeks,
});
