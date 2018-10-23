import { combineReducers } from 'redux';
import user from './user';
import auth from './auth';
import posts from './posts';

export default combineReducers({
  user,
  auth,
  posts,
});
