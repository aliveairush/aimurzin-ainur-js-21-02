import { UserProfileType, UserType } from './dummyApiResponses';

export interface IUserListState {
  userList: Array<UserType>
  total: number;
  page: number;
  limit: number;
}

export interface IUserProfileState{
  user: UserProfileType,
  loading: boolean
}
