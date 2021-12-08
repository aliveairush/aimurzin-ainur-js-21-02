import { EventEmitter } from 'events';
import { UserListResponse } from '../types/dummyApiResponses';
import dispatcher from '../dispatcher';
import { IUserListState } from '../types/state';
import { LoadUserListActionType } from '../types/actions';
import { LOAD_USERLIST_SUCCESS } from '../constants/actions/userlist';

class UserListStore extends EventEmitter {
  private state;

  constructor() {
    super();
    this.state = {
      userList: [],
      page: 0,
      limit: 10,
      total: 1,
    } as IUserListState;
    this.getState = this.getState.bind(this);
    this.loadUserListSuccess = this.loadUserListSuccess.bind(this);
  }

  getState = () => this.state;

  loadUserListSuccess = (userListResponse: UserListResponse) => {
    this.state = {
      userList: userListResponse.data,
      page: userListResponse.page,
      limit: userListResponse.limit,
      total: userListResponse.total,
    };
    this.emit('change');
  };

  handleActions(action: LoadUserListActionType) {
    switch (action.type) {
      case LOAD_USERLIST_SUCCESS: this.loadUserListSuccess(action.payload); break;
      default: () => {};
    }
  }
}

const userListStore = new UserListStore();

dispatcher.register(userListStore.handleActions.bind(userListStore));

export default userListStore;
