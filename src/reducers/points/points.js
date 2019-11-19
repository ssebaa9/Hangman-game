import * as actionTypes from '../actions';

const initialState = {
  points: 5
}

const points = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POINTS:
      return {
        ...state,
        points: state.points - 1
      }
    case actionTypes.RESET:
      return {
        ...state,
        points: 5
      }
    default:
      return state
  }
}

export default points