import { UserType } from './dummyApiResponses';

export interface UserListState {
  userList: Array<UserType>
  total: number;
  page: number;
  limit: number;
}
