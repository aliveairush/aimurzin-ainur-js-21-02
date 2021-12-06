import { UserListResponse } from './dummyApiResponses';

export interface ActionType {
  type: string;
}

export interface LoadUserListActionType extends ActionType {
  payload: UserListResponse;
}
