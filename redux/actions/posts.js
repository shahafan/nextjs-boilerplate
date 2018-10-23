import {
  POSTS_FETCH_DATA,
  POSTS_IS_LOADING,
  POSTS_HAS_ERROR,
  POSTS_INCREMENT_NUM_OF_CLICKS,
  API,
} from './types';
import { api } from './api';
import config from '../../common/config';

export const postsFetchData = data => ({
  type: POSTS_FETCH_DATA,
  data,
});


export const postsIsLoading = bool => ({
  type     : POSTS_IS_LOADING,
  isLoading: bool,
});

export const postsHasError = bool => ({
  type    : POSTS_HAS_ERROR,
  hasError: bool,
});

export const postsGetData = () => (api({
  type   : API,
  payload: {
    url: {
      base    : 'https://jsonplaceholder.typicode.com',
      endpoint: '/todos',
    },
    method : 'get',
    success: data => postsFetchData(data),
    failure: data => postsHasError(true),
    loader : bool => postsIsLoading(bool),
  },
}));


export const postsInceremntNumOfClicks = () => ({
  type: POSTS_INCREMENT_NUM_OF_CLICKS,
});
