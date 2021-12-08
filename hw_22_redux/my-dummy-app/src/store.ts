import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import userListReducer from './reducers/userListReducer';
import userProfileReducer from './reducers/userProfileReducer';

export default createStore(combineReducers({
  userListState: userListReducer,
  userProfileState: userProfileReducer,
}), applyMiddleware(thunk));
