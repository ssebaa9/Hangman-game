import React, { Component } from 'react';
import Header from './components/Header/Header';
import Hangman from './containers/Hangman/Hangman';


class App extends Component {


  render() {
    return (
      <div>
        <Header />
        <Hangman />
      </div>
    );
  }
}

export default App;
