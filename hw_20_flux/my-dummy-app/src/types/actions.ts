import { UserListResponse, UserProfileType } from './dummyApiResponses';

export interface ActionType {
  type: string;
}

export interface LoadUserListActionType extends ActionType {
  payload: UserListResponse;
}

export interface LoadUserProfileActionType extends ActionType {
  payload: UserProfileType;
}
