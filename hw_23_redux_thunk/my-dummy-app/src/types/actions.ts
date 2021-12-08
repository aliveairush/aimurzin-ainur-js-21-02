import { UserListResponse } from './dummyApiResponses';
import { UserProfileType } from '../../../../hw_20_flux/my-dummy-app/src/types/dummyApiResponses';

export interface ActionType {
  type: string;
}

export interface LoadUserListActionType extends ActionType {
  payload: UserListResponse;
}

export interface LoadUserProfileActionType extends ActionType {
  payload: UserProfileType;
}
