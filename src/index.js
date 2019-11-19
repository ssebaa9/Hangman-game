import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/styles.scss';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import mainReducer from './reducers/mainReducer';
import lettersReducer from './reducers/letters/letters';
import pointsReducer from './reducers/points/points';
import errorsReducer from './reducers/errors/errors';

const rootReducer = combineReducers({
  mainReducer: mainReducer,
  letters: lettersReducer,
  points: pointsReducer,
  err: errorsReducer
})

const store = createStore(rootReducer)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

