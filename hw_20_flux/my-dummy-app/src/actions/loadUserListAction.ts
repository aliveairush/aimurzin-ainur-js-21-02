import dispatcher from '../dispatcher';
import { getUserList } from '../api/dummyApi';
import { LOAD_USERLIST_SUCCESS } from '../constants/actions/userlist';

export const loadUserListAction = (newPageNumber: number, pageSize: number) => {
  // dispatcher.dispatch({
  //   type: 'LOAD_USERLIST',
  // });

  getUserList(newPageNumber, pageSize, (resp) => {
    dispatcher.dispatch({
      type: LOAD_USERLIST_SUCCESS,
      payload: resp,
    });
  });
};

export const changeContentLimitAction = (newLimit: number) => {
  getUserList(0, newLimit, (resp) => {
    dispatcher.dispatch({
      type: LOAD_USERLIST_SUCCESS,
      payload: resp,
    });
  });
};
