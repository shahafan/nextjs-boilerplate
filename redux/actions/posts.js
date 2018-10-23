import {
  POSTS_FETCH_DATA,
  POSTS_IS_LOADING,
  POSTS_HAS_ERROR,
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

export const postsGetData = () => postsFetchData([
  {
    id   : 1,
    title: 'post 1',
  },
  {
    id   : 2,
    title: 'post 2',
  },
]);
/* export const postsGetData = () => (api({
  type   : API,
  payload: {
    url: {
      base    : config.app.api_url,
      endpoint: '/posts',
    },
    method : 'get',
    success: data => postsFetchData(data),
    failure: data => postsHasError(true),
    loader : bool => postsIsLoading(bool),
  },
})); */
