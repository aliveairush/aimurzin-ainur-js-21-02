import produce from 'immer';
import { IUserListState } from '../types/state';
import { LoadUserListActionType } from '../types/actions';
import { LOAD_USERLIST_SUCCESS } from '../constants/actions';
import { UserListResponse } from '../types/dummyApiResponses';

const initialState: IUserListState = {
  userList: [{
    id: '1', firstName: 'hello', lastName: 'fsaf', picture: 'fdf', title: 'fd',
  }],
  page: 0,
  total: 1,
  limit: 10,
};

const loadSuccess = (draft: IUserListState, resp: UserListResponse) => {
  draft.userList = resp.data || [];
  draft.page = resp.page;
  draft.total = resp.total;
  return draft;
};

const userListReducer = (
  state = initialState,
  action: LoadUserListActionType,
) => produce(state, (draft: IUserListState) => {
  switch (action.type) {
    case LOAD_USERLIST_SUCCESS: return loadSuccess(draft, action.payload);
    default: return state;
  }
});

export default userListReducer;
