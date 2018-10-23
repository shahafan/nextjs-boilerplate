import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_TOKEN_SAVED,
  API,
} from './types';
import { api } from './api';
import { userGetData } from './user';
import config from '../../common/config';

/**
 *
 * @param {string} token
 */
export const authLogin = token => ({
  type: AUTH_LOGIN,
  token,
});

/**
 *
 * @param {array} data
 */
const tokenSaved = data => ({
  type: AUTH_TOKEN_SAVED,
  data,
});


/**
 * @returns {Function} thunk
 * @param token
 */
const sessionLogin = data => ({
  type   : API,
  payload: {
    url: {
      endpoint: '/api/auth',
    },
    method : 'patch',
    data,
    success: data => console.log(data),
    failure: data => tokenSaved(data),
  },
});

/**
 * @returns {Function} thunk
 * @param data
 */
export const login = data => (api({
  type   : API,
  payload: {
    url: {
      base    : config.app.api_url,
      endpoint: '/auth/login',
    },
    method : 'post',
    data,
    success: (response) => {
      const { status, token } = response;
      return (dispatch) => {
        dispatch(authLogin(token));
        dispatch(sessionLogin(response));
      };
    },
    failure: data => tokenSaved(data),
  },
}));

/**
 * @returns {Function} thunk
 */
const sessionLogOut = () => ({
  type   : API,
  payload: {
    url: {
      endpoint: '/api/auth/logout',
    },
    method : 'post',
    success: response => (dispatch) => {
      dispatch(authLogin(false));
      dispatch(userGetData(''));
    },
    failure: data => authLogin(false),
  },
});

/**
 * @returns {Function} thunk
 */
export const authRefresh = () => (api({
  type   : API,
  payload: {
    url: {
      base    : config.app.api_url,
      endpoint: '/auth/refresh',
    },
    method : 'post',
    success: (response) => {
      const { status, token } = response;
      return (dispatch) => {
        dispatch(authLogin(token));
        dispatch(sessionLogin(response));
      };
    },
    failure: data => sessionLogOut(),
  },
}));

/**
 * @returns {Function} thunk
 */
export const authLogOut = () => (api({
  type   : API,
  payload: {
    url: {
      base    : config.app.api_url,
      endpoint: '/auth/logout',
    },
    method : 'post',
    success: data => sessionLogOut(),
    failure: data => sessionLogOut(),
  },
}));

