import * as actionTypes from './actionTypes';
import axios from 'axios';

const fetchWordsSuccess = (word) => {
  return {
    type: actionTypes.FETCH_WORDS_SUCCESS,
    word
  }
}

const fetchWordsFail = (error) => {
  return {
    type: actionTypes.FETCH_WORDS_FAIL,
    error
  }
}

export const fetchWords = () => {
  return dispatch => {
    axios.get('https://hangman-app-9e85e.firebaseio.com/words.json')
      .then(resp => {
        if (resp.status === 200) {
          return resp.data
        }
      })
      .then(words => {
        const randomNumber = Math.floor(Math.random() * words.length);
        const wordToArray = words[randomNumber].name.split('');
        dispatch(fetchWordsSuccess(wordToArray));
      })
      .catch(err => {
        dispatch(fetchWordsFail(err))
      })
  }
}

export const resetHangmanGame = () => {
  return dispatch => {
    axios.get('https://hangman-app-9e85e.firebaseio.com/words.json')
      .then(resp => {
        if (resp.status === 200) {
          return resp.data
        }
      })
      .then(words => {
        const randomNumber = Math.floor(Math.random() * words.length);
        const wordToArray = words[randomNumber].name.split('');
        dispatch(resetHangman(wordToArray));
      })
      .catch(err => {
        dispatch(fetchWordsFail(err))
      })
  }
}


export const resetHangman = (word) => {
  return {
    type: actionTypes.RESET,
    word
  }
}


export const showModal = () => {
  return {
    type: actionTypes.SHOW_MODAL,
  }
}

export const addCorrectLetter = (result) => {
  return {
    type: actionTypes.ADD_CORRECT_LETTER,
    result
  }
}

export const addIncorrectLetter = (result) => {
  return {
    type: actionTypes.ADD_INCORRECT_LETTER,
    result
  }
}

export const pointsHandler = () => {
  return {
    type: actionTypes.POINTS
  }
}

export const checkCorrectValue = () => {
  return {
    type: actionTypes.ERR_WRONG_VALUE
  }
}

export const checkDubbleLetter = () => {
  return {
    type: actionTypes.ERR_DUBBLE_LETTER
  }
}


