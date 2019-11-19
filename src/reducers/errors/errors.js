import * as actionTypes from '../actions';

const initialState = {
  error: ''
}

const errors = (state = initialState, action) => {
  switch (action.type) {
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
    case actionTypes.ADD_INCORRECT_LETTER:
      return {
        ...state,
        error: null
      }
    case actionTypes.ADD_CORRECT_LETTER:
      return {
        ...state,
        error: null
      }
    case actionTypes.RESET:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }


}

export default errors;