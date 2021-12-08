import produce from 'immer';
import { LoadUserProfileActionType } from '../types/actions';
import { IUserProfileState } from '../types/state';
import { LOAD_USER_PROFILE, LOAD_USER_PROFILE_SUCCESS } from '../constants/actions';
import { UserProfileType } from '../types/dummyApiResponses';

const initialState = {
  user: {},
  loading: false,
} as IUserProfileState;

const showLoading = (draft: IUserProfileState) => {
  draft.loading = true;
  return draft;
};

const loadSuccess = (draft: IUserProfileState, resp: UserProfileType) => {
  draft.user = resp;
  draft.loading = false;
  return draft;
};

const userProfileReducer = (
  state = initialState,
  action: LoadUserProfileActionType,
) => produce(state, (draft: IUserProfileState) => {
  switch (action.type) {
    case LOAD_USER_PROFILE: return showLoading(draft);
    case LOAD_USER_PROFILE_SUCCESS: return loadSuccess(draft, action.payload);
    default: return state;
  }
});

export default userProfileReducer;
