import { UserProfileType, UserType } from './dummyApiResponses';

export interface IUserListStore {
  userListState: IUserListState;
}

export interface IUserListState {
  userList: Array<UserType>
  total: number;
  page: number;
  limit: number;
}

export interface IUserProfileStore {
  userProfileState: IUserProfileState;
}

export interface IUserProfileState {
  user: UserProfileType,
  loading: boolean;
}
