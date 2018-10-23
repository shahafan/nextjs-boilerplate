/* eslint-disable */

export const INITIAL_STATE = {
  auth: {
    loggedIn: false,
    token   : null,
  },
  user: {
    data     : {},
    isLoading: true,
    hasError : false,
  },
  posts: {
    data     : {},
    isLoading: false,
    hasError : false,
    numOfClicks : 0,
  },
};
