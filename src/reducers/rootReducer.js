import { combineReducers } from 'redux'
import userReducer from './userReducer';
import parkReducer from './parkReducer';
import tripReducer from './tripReducer';
import modalReducer from './modalReducer';
import errorMsgReducer from './errorMsgReducer';

export default combineReducers({
  user: userReducer,
  park: parkReducer,
  trip: tripReducer,
  modal: modalReducer,
  error: errorMsgReducer
})