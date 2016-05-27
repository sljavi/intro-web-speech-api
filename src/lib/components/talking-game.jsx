import Chapi from './chapi';
import Javi from './javi';
import React from 'react';
import TalkingGameDialog from '../talking-game-dialog';

class TalkingGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: {
        matchedkey: '',
        text: ''
      }
    };
    this.handleJaviSpeak = this.handleJaviSpeak.bind(this);
  }

  handleJaviSpeak(text) {
    this.setState({
      answer: TalkingGameDialog.getAnswerFor(text)
    });
  }

  render() {
    return (
      <div className='fullheight talking-game'>
        <Chapi answer={this.state.answer}/>
        <Javi onSpeak={this.handleJaviSpeak} matchedText={this.state.answer.matchedKey}/>
      </div>
    );
  }
};

export default TalkingGame;
