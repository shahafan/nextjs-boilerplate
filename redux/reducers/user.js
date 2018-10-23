import { INITIAL_STATE } from '../../common/app-const';
import { USER_GET_DATA } from '../actions/types';

const user = (state = INITIAL_STATE.user, action) => {
  switch (action.type) {
    case USER_GET_DATA: {
      return { ...state, data: action.data };
    }
    default: {
      return state;
    }
  }
};

export default user;
