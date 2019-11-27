import React from 'react';
import Button from '../UI/Button/Button';
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index';

const looserOrWinner = (props) => {
  let looseOrWin = null
  switch (props.case) {
    case ('loose'):
      looseOrWin = <p className="looserOrWinner__result">You Loose!</p>
      break;
    case ('win'):
      looseOrWin = <p className="looserOrWinner__result">Congratulations! You Win!</p>
      break;
    default:
      looseOrWin = ''
  }

  return (
    <div className="looserOrWinner">
      {looseOrWin}
      <small>The word was:</small>
      <strong className="looserOrWinner__word">{props.word}</strong>
      <Button class="looserOrWinner__btn" clicked={props.onResetHagmanGame}>Play again</Button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    word: state.randomWordArray
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onResetHagmanGame: () => dispatch(actions.resetHangmanGame()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(looserOrWinner);