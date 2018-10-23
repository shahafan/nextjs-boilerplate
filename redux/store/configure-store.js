import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import RavenMiddleware from 'redux-raven-middleware';
import NodeService from '../../util/node-service';
import { INITIAL_STATE } from '../../common/app-const';
import rootReducer from '../reducers/root-reducer';
import api from '../middlewares/api';
import clicks from '../middlewares/clicks';

/**
 * Determine which Redux store to provide based on the
 * Environment Type of Node.js
 * @return {object}    Redux store
 */

const middlewares = [
  thunk,
  api,
  clicks,
];

middlewares.push(NodeService.isProduction() ? RavenMiddleware('sentry_dsn') : logger);

// noinspection JSCheckFunctionSignatures
const store = (initialState = INITIAL_STATE) => (
  createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares),
  )
);

export default store;
