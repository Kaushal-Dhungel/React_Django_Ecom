import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Redux part
import { createStore,applyMiddleware, combineReducers,compose } from 'redux';
import { Provider } from 'react-redux';

// two reducers
import Reducer from './redux_ecom/Reducer';
import AuthReducer from './store/reducers/auth'

import thunk from 'redux-thunk';

// combine the reducers
const newReducer = combineReducers({Reducer,AuthReducer})

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(newReducer,composeEnhances(applyMiddleware(thunk))); 


const ReduxApp = (
  <Provider store={store}>
      <App />
  </Provider>
)

ReactDOM.render(
  <React.StrictMode>
    {ReduxApp }
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
