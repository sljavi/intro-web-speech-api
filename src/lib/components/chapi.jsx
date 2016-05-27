import _ from 'lodash';
import React from 'react';

const speechSynthesis = window.speechSynthesis;
const voices = {
  'es-AR': 0,
  'it-IT': 1,
  'pt-PT': 0
};

class Chapi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastText: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.answer !== nextProps.answer && nextProps.answer.text !== this.state.lastText) {
      this.say(nextProps.answer);
    }
  }

  getVoiceByLang(lang) {
    return speechSynthesis.getVoices().filter(voice => voice.lang.indexOf(lang) >= 0)[voices[lang]];
  }

  say(what) {
    const msg = new SpeechSynthesisUtterance();
    const lang = what.lang || 'es-AR';
    const defaultMsg = {
      lang,
      voice: this.getVoiceByLang(lang)
    };

    this.setState({
      lastText: what.text
    });
    _.extend(msg, defaultMsg, _.pick(what, 'text'));
    speechSynthesis.speak(msg);
  }

  render() {
    const image = this.props.answer.img || 'chapi.jpg';

    return (
      <div className='chapi'>
        <div className='chapi-avatar-container'>
          <img src={`images/${image}`} alt='chapi-avatar'/>
        </div>
        <p>{this.props.answer.text}</p>
      </div>
    );
  }
};

Chapi.propTypes = {
  answer: React.PropTypes.shape({
    img: React.PropTypes.string,
    text: React.PropTypes.string.isRequired
  })
};

export default Chapi;
