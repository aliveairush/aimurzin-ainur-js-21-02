import { Dispatch } from 'redux';
import { LOAD_USER_PROFILE, LOAD_USER_PROFILE_SUCCESS } from '../constants/actions';
import { apiGetUserById } from '../api/dummyApi';
import { UserProfileType } from '../types/dummyApiResponses';

export const loadUserProfileAction = (userId: string) => (dispatch: Dispatch) => {
  dispatch({
    type: LOAD_USER_PROFILE,
  });

  apiGetUserById(userId).then((resp: UserProfileType) => {
    dispatch({
      type: LOAD_USER_PROFILE_SUCCESS,
      payload: resp,
    });
  });
};
