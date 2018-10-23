import { POSTS_INCREMENT_NUM_OF_CLICKS } from '../actions/types';
import { postsIsLoading } from '../actions/posts';

const clicks = ({ dispatch, getState }) => next => (action) => {
  if (action.type === POSTS_INCREMENT_NUM_OF_CLICKS) {
    if (getState().posts.numOfClicks === 10) {
      dispatch(postsIsLoading(true));
    }
  }
  return next(action);
};

export default clicks;
