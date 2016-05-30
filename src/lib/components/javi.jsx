import _ from 'lodash';
import React from 'react';
import SpeechRecognizer from '../speech-recognizer';
import classNames from 'classnames';

const $ = window.$;
const S_KEY_CODE = 83;

class Javi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speech: {
        confidence: 0,
        final: false,
        text: ''
      },
      talking: false
    };
    this.handleSpeech = this.handleSpeech.bind(this);
    this.turnOnMic = this.turnOnMic.bind(this);
    this.turnOffMic = this.turnOffMic.bind(this);
  }

  componentWillMount() {
    $('body').keyup(this.handleKeyUp.bind(this));
    this.speechRecognition = this.initializeSpeechRecognition();
  }

  componentWillUnmount() {
    this.speechRecognition.abort();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.matchedText !== this.props.matchedText) {
      this.setState({
        speech: _.extend({}, this.state.speech, {text: nextProps.matchedText}),
        talking: false
      });
    }
  }

  handleKeyUp(event) {
    if (event.keyCode === S_KEY_CODE && !this.state.talking) {
      this.speechRecognition.start();
    }
  }

  handleSpeech(speech) {
    this.setState({speech});
    if (speech.final) {
      this.props.onSpeak(speech.text);
    }
  }

  initializeSpeechRecognition() {
    return new SpeechRecognizer({
      onEnd: this.turnOffMic,
      onError: this.turnOffMic,
      onResult: this.handleSpeech,
      onStart: this.turnOnMic,
      continuous: false
    });
  }

  turnOffMic() {
    this.setState({talking: false});
  }

  turnOnMic() {
    this.setState({talking: true});
  }

  render() {
    const microphoneClasses = classNames({
      mic: true,
      display: this.state.talking
    });

    const textClasses = classNames({final: this.state.speech.final});

    return (
      <div className='javi'>
        <div className='javi-avatar-container'>
          <img className='avatar' src='images/javi.jpg' alt='javi-avatar'/>
          <img className={microphoneClasses} src='images/mic.png' alt='mic' />
        </div>
        <p className={textClasses}>
          {this.state.speech.text}
        </p>
      </div>
    );
  }
};

Javi.propTypes = {
  matchedText: React.PropTypes.string,
  onSpeak: React.PropTypes.func
};

export default Javi;
