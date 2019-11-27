import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/styles.scss';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import hangmanReducer from './store/reducers/hangman';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(hangmanReducer, composeEnhancers(
  applyMiddleware(thunk)
))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

