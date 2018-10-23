import {
  USER_GET_DATA,
  API,
} from './types';
import { api } from './api';
import { authRefresh } from './auth';
import config from '../../common/config';

/**
 * @param {object} data
 */
export const userGetData = data => ({
  type: USER_GET_DATA,
  data,
});

/**
 * @returns {Function} thunk
 */
export const userFetchData = () => (api({
  type   : API,
  payload: {
    url: {
      base    : config.app.api_url,
      endpoint: '/user',
    },
    method : 'get',
    success: data => userGetData(data),
    failure: data => authRefresh(),
  },
}));

