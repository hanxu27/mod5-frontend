import { combineReducers } from 'redux'
import userReducer from './userReducer';
import parkReducer from './parkReducer';
import tripReducer from './tripReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  user: userReducer,
  park: parkReducer,
  trip: tripReducer,
  modal: modalReducer,
})