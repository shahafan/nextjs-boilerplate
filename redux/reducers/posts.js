import { INITIAL_STATE } from '../../common/app-const';
import {
  POSTS_FETCH_DATA,
  POSTS_IS_LOADING,
  POSTS_HAS_ERROR,
  POSTS_INCREMENT_NUM_OF_CLICKS,
} from '../actions/types';

const posts = (state = INITIAL_STATE.posts, action) => {
  switch (action.type) {
    case POSTS_FETCH_DATA: {
      return { ...state, data: action.data };
    }
    case POSTS_IS_LOADING: {
      return { ...state, isLoading: action.isLoading };
    }
    case POSTS_HAS_ERROR: {
      return { ...state, hasError: action.hasError };
    }
    case POSTS_INCREMENT_NUM_OF_CLICKS: {
      return { ...state, numOfClicks: state.numOfClicks + 1 };
    }
    default: {
      return state;
    }
  }
};

export default posts;
