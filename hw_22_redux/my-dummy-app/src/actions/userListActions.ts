import { Dispatch } from 'redux';
import { apiGetUserList } from '../api/dummyApi';
import { LOAD_USERLIST_SUCCESS } from '../constants/actions';

export const loadUserListAction = (newPageNumber: number, pageSize: number) => (dispatch: Dispatch) => {
  console.log('loadUserListAction');
  apiGetUserList(newPageNumber, pageSize).then((resp) => dispatch({
    type: LOAD_USERLIST_SUCCESS,
    payload: resp,
  }));
};
