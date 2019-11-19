import words from '../data/words';
import * as actionTypes from './actions';

const initialState = {
  randomWordArray: words[Math.floor(Math.random() * words.length)].toLowerCase().split(''),
  showModal: false
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET:
      return {
        ...state,
        randomWordArray: words[Math.floor(Math.random() * words.length)].toLowerCase().split(''),
        showModal: false
      }
    case actionTypes.SHOW_MODAL:
      return {
        ...state,
        showModal: true
      }
    default:
      return state
  }
}

export default mainReducer