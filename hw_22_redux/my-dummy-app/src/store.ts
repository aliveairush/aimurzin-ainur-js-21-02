import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import userListReducer from './reducers/userListReducer';

export default createStore(combineReducers({
  userListState: userListReducer,
}), applyMiddleware(thunk));
