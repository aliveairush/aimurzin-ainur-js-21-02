import EventEmitter from 'events';
import dispatcher from '../dispatcher';
import { LoadUserProfileActionType } from '../types/actions';
import { LOAD_USER_PROFILE, LOAD_USER_PROFILE_SUCCESS } from '../constants/actions/userProfile';
import { IUserProfileState } from '../types/state';

class UserProfileStore extends EventEmitter {
  private state;

  constructor() {
    super();
    this.state = {} as IUserProfileState;
    this.getState = this.getState.bind(this);
  }

  getState = () => this.state;

  handleActions(action: LoadUserProfileActionType) {
    switch (action.type) {
      case LOAD_USER_PROFILE: {
        this.state = {
          ...this.state, loading: true,
        };
        this.emit('change');
        break;
      }
      case LOAD_USER_PROFILE_SUCCESS: {
        this.state = {
          user: action.payload,
          loading: false,
        };
        this.emit('change');
        break;
      }
      default: () => {};
    }
  }
}

const userProfileStore = new UserProfileStore();

dispatcher.register(userProfileStore.handleActions.bind(userProfileStore));

export default userProfileStore;
