import dispatcher from '../dispatcher';
import { LOAD_USER_PROFILE, LOAD_USER_PROFILE_SUCCESS } from '../constants/actions/userProfile';
import { getUserById } from '../api/dummyApi';

export const loadUserProfileAction = (userId: string) => {
  dispatcher.dispatch({
    type: LOAD_USER_PROFILE,
  });

  getUserById(userId, (resp) => {
    dispatcher.dispatch({
      type: LOAD_USER_PROFILE_SUCCESS,
      payload: resp,
    });
  });
};
