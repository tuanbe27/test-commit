import { compose, combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import { authReducer } from './reducers/auth.reducer.js';
const middleware = [thunkMiddleware];

const rootReducer = combineReducers({ auth: authReducer });

const store = configureStore(
  { reducer: rootReducer },
  {
    middleware: compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
  }
);

export default store;
