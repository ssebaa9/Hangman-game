import * as actionTypes from '../actions/actionTypes';

const initialState = {
  word: '',
  showModal: false,
  correctLetters: [],
  incorrectLetters: [],
  correctLetter: '',
  error: '',
  points: 5
}

const hangman = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_WORDS_SUCCESS:
      return {
        ...state,
        word: action.word
      }
    case actionTypes.FETCH_WORDS_FAIL:
      return {
        ...state
      }
    case actionTypes.SHOW_MODAL:
      return {
        ...state,
        showModal: true
      }
    case actionTypes.ADD_CORRECT_LETTER:
      return {
        ...state,
        correctLetters: state.correctLetters.concat(action.result),
        correctLetter: action.result,
        error: null
      }
    case actionTypes.ADD_INCORRECT_LETTER:
      return {
        ...state,
        incorrectLetters: state.incorrectLetters.concat(action.result),
        error: null
      }
    case actionTypes.POINTS:
      return {
        ...state,
        points: state.points - 1
      }
    case actionTypes.ERR_WRONG_VALUE:
      return {
        ...state,
        error: 'Wrong value! Please try enter something else.'
      }
    case actionTypes.ERR_DUBBLE_LETTER:
      return {
        ...state,
        error: 'You tryed already with this letter! Please try to enter another one.'
      }
    case actionTypes.RESET:
      return {
        ...state,
        word: action.word,
        showModal: false,
        correctLetters: [],
        incorrectLetters: [],
        correctLetter: '',
        error: null,
        points: 5
      }
    default:
      return state
  }
}

export default hangman