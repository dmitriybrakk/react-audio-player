import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import logger from 'redux-logger';

import rootReducer from './reducers/index';

const middleware = composeWithDevTools(applyMiddleware(logger));

export default createStore(rootReducer, middleware);
