import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';

const rootReducer = combineReducers({
  auth: authReducer,
});

let enhancer;
const middlewares = [thunk];
if(process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(...middlewares);
} else {
  const logger = require(`redux-logger`).default;
  middlewares.push(logger);
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(...middlewares));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer)
}


export default configureStore;
