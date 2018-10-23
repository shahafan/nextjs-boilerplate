import { INITIAL_STATE } from '../../common/app-const';
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_TOKEN_SAVED,
} from '../actions/types';

const auth = (state = INITIAL_STATE.auth, action) => {
  switch (action.type) {
    case AUTH_LOGIN: {
      return {
        ...state,
        token   : action.token,
        loggedIn: !!action.token,
      };
    }
    case AUTH_LOGOUT: {
      return {
        ...state,
        token   : null,
        loggedIn: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default auth;
