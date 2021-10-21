import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AlphaButtons from './AlphaButtons';
import './Hangman.css';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';
import { randomWord } from './words';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.guess = this.guess.bind(this);
    this.reset = this.reset.bind(this);
    this.generateButtons = this.generateButtons.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split('')
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : '_')); //if current letter is found in set, reveal letter otherwise provide underscore
  }

  /** guess: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  guess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map((ltr) => (
      <button
        key={uuidv4()}
        value={ltr}
        onClick={this.guess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }
  /** reset: resets the game state and gets a new word */
  reset() {
    this.setState(() => {
      return { nWrong: 0, guessed: new Set(), answer: randomWord() };
    });
  }

  /** render: render game */
  render() {
    const { nWrong, answer } = this.state;
    const { maxWrong } = this.props;
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img
          src={this.props.images[nWrong]}
          alt={
            nWrong < maxWrong ? `${nWrong} out of 6 guesses` : 'Out of guesses!'
          }
        />
        <p>Number wrong: {nWrong}</p>
        <p className="Hangman-word">
          {nWrong < maxWrong ? this.guessedWord() : answer}
        </p>
        <div className="Hangman-btns">
          {this.guessedWord().join('') === answer ? (
            'You Won! WOO!'
          ) : nWrong < maxWrong ? (
            <AlphaButtons generateButtons={this.generateButtons} />
          ) : (
            'You Lost!'
          )}
        </div>
        <div>
          {nWrong === maxWrong ? (
            <button className="Hangman-reset" onClick={this.reset}>
              Reset Game
            </button>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    );
  }
}

export default Hangman;
