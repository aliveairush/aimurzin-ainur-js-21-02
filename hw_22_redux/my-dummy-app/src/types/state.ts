import { UserType } from './dummyApiResponses';

export interface State {
  userListState: IUserListState;
}

export interface IUserListState {
  userList: Array<UserType>
  total: number;
  page: number;
  limit: number;
}
