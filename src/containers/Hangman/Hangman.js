import React, { Component } from 'react';
import LooserOrWinner from '../../components/LooserOrWinner/LooserOrWinner';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';

import { connect } from 'react-redux'
import * as actionTypes from '../../reducers/actions';

class Hangman extends Component {
  state = {
    showModal: false,
  }

  handleCheckCorrectLetter = (e) => {
    e.preventDefault();

    const { incorrectLetters } = this.props.letters;
    const { word, onAddCorrectLetter, onAddInorrectLetter, onPointsHandler } = this.props

    const guessedLetter = e.target.elements.input.value.toLowerCase();
    const correctLetter = word.find(letter => letter.toLocaleLowerCase() === guessedLetter.toLocaleLowerCase())

    const wrongLetter = incorrectLetters.find(letter => letter.toLocaleLowerCase() === guessedLetter.toLocaleLowerCase())

    const wrongValues = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', '{', ']', '}', '|', ':', ';', "'", '"', ',', '<', '.', '>', '?', '/']
    const wrongValue = wrongValues.every(wrongValue => wrongValue !== guessedLetter)

    if (guessedLetter === correctLetter && guessedLetter !== ' ' && guessedLetter !== '' && isNaN(guessedLetter)) {
      onAddCorrectLetter(correctLetter)
    } else if (guessedLetter !== correctLetter && guessedLetter !== ' ' && guessedLetter !== '' && isNaN(guessedLetter) && !incorrectLetters.includes(wrongLetter) && wrongValue) {
      onAddInorrectLetter(guessedLetter)
      onPointsHandler()
    }

    this.validationhandler(guessedLetter, wrongLetter, wrongValue)

    e.target.elements.input.value = '';
  }

  validationhandler = (guessedLetter, wrongLetter, wrongValue) => {
    if (guessedLetter === ' ' || guessedLetter === '' || !isNaN(guessedLetter)) {
      this.props.onCheckedCorrectValue()
    } else if (!wrongValue) {
      this.props.onCheckedCorrectValue()
    } else if (this.props.letters.incorrectLetters.includes(wrongLetter)) {
      this.props.onCheckedDubbleLetter()
    } else if (this.props.letters.correctLetters.includes(guessedLetter)) {
      this.props.onCheckedDubbleLetter()
    }
  }

  render() {

    const { correctLetters, incorrectLetters } = this.props.letters
    const { points, word, err } = this.props

    console.log(word)

    const puzzleArray = []
    let puzzle = ''
    word.forEach(letter => {
      if (correctLetters.includes(letter)) {
        puzzleArray.push(letter)
        puzzle += letter + ' '
      } else {
        puzzle += '_ '
      }
    })

    let showWinOrLoose = null;
    if (points === 0) {
      this.props.onShowModal()
      showWinOrLoose =
        <LooserOrWinner
          case='loose'
        />
    } else if (word.length === puzzleArray.length) {
      this.props.onShowModal()
      showWinOrLoose =
        <LooserOrWinner
          case='win'
        />
    }

    return (
      <div className="hangman" >
        <div className="hangman__result">
          <p>Incorrect letters: {incorrectLetters.join()} </p>
          <p>Points: <strong>{points}</strong></p>
          <p className="hangman__result-word"><strong>{puzzle}</strong></p>
        </div>
        <div className="hangman__form-container">
          <form onSubmit={this.handleCheckCorrectLetter} >
            <input className='hangman__form-container__input' type="text" placeholder='letter' name='input' maxLength='1' />
            <Button class='hangman__form-container__btn'>Guess</Button>
          </form>
          <small className="hangman__error">{err}</small>
        </div>

        <Modal>
          {showWinOrLoose}
        </Modal>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    word: state.mainReducer.randomWordArray,
    showModal: state.mainReducer.showModal,
    letters: state.letters,
    points: state.points.points,
    err: state.err.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddCorrectLetter: (result) => dispatch({ type: actionTypes.ADD_CORRECT_LETTER, result }),
    onAddInorrectLetter: (result) => dispatch({ type: actionTypes.ADD_INCORRECT_LETTER, result }),
    onPointsHandler: () => dispatch({ type: actionTypes.POINTS }),
    onResetHagmanGame: () => dispatch({ type: actionTypes.RESET }),
    onCheckedCorrectValue: () => dispatch({ type: actionTypes.ERR_WRONG_VALUE }),
    onCheckedDubbleLetter: () => dispatch({ type: actionTypes.ERR_DUBBLE_LETTER }),
    onShowModal: () => dispatch({ type: actionTypes.SHOW_MODAL })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hangman);