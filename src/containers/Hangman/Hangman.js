import React, { Component } from 'react';
import LooserOrWinner from '../../components/LooserOrWinner/LooserOrWinner';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import { connect } from 'react-redux'
import * as actions from '../../store/actions/index';

class Hangman extends Component {

  componentDidMount() {
    this.props.onFetchWords()
  }

  handleCheckCorrectLetter = (e) => {
    e.preventDefault();

    const { word, incorrectLetters, onAddCorrectLetter, onAddInorrectLetter, onPointsHandler } = this.props

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
    if (guessedLetter === ' ' || guessedLetter === '' || !isNaN(guessedLetter) || !wrongValue) {
      this.props.onCheckedCorrectValue()
    } else if (this.props.incorrectLetters.includes(wrongLetter) || this.props.correctLetters.includes(guessedLetter)) {
      this.props.onCheckedDubbleLetter()
    }
  }

  render() {
    const { points, word, err, correctLetters, incorrectLetters } = this.props

    const puzzleArray = []
    let showWinOrLoose = null;
    let puzzle = <Spinner />;

    if (word) {
      puzzle = '';
      word.forEach(letter => {
        if (correctLetters.includes(letter)) {
          puzzleArray.push(letter)
          puzzle += letter + ' '
        } else {
          puzzle += '_ '
        }
      })

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
    }


    return (
      <div className="hangman" >
        <div className="hangman__result">
          <p>Incorrect letters: {incorrectLetters.join()} </p>
          <p>Points: <strong>{points}</strong></p>
          <div className="hangman__result-word"><strong>{puzzle}</strong></div>
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
    word: state.word,
    showModal: state.showModal,
    correctLetters: state.correctLetters,
    incorrectLetters: state.incorrectLetters,
    correctLetter: state.correctLetter,
    points: state.points,
    err: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddCorrectLetter: (result) => dispatch(actions.addCorrectLetter(result)),
    onAddInorrectLetter: (result) => dispatch(actions.addIncorrectLetter(result)),
    onPointsHandler: () => dispatch(actions.pointsHandler()),
    onCheckedCorrectValue: () => dispatch(actions.checkCorrectValue()),
    onCheckedDubbleLetter: () => dispatch(actions.checkDubbleLetter()),
    onShowModal: () => dispatch(actions.showModal()),
    onFetchWords: () => dispatch(actions.fetchWords()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hangman);