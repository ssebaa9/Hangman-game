import * as actionTypes from '../actions';

const initialState = {
  correctLetters: [],
  incorrectLetters: [],
  correctLetter: '',
}

const letters = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CORRECT_LETTER:
      return {
        ...state,
        correctLetters: state.correctLetters.concat(action.result),
        correctLetter: action.result
      }
    case actionTypes.ADD_INCORRECT_LETTER:
      return {
        ...state,
        incorrectLetters: state.incorrectLetters.concat(action.result)
      }
    case actionTypes.RESET:
      return {
        ...state,
        correctLetters: [],
        incorrectLetters: [],
        correctLetter: ''
      }
    default:
      return state
  }

}

export default letters;