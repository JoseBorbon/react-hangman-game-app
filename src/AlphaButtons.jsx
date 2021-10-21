import React, { Component } from 'react';

class AlphaButtons extends Component {
  /** generateButtons: return array of letter buttons to render */

  handleGenerateButtons = () => {
    return this.props.generateButtons();
  };
  render() {
    return <div class="Hangman-btns">{this.handleGenerateButtons()}</div>;
  }
}

export default AlphaButtons;
