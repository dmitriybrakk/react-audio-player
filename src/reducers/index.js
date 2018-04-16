import { combineReducers } from 'redux';

import tracksReducer from './tracksReducer';
import playerReducer from './playerReducer';

export default combineReducers({
  tracksReducer,
  playerReducer
});
