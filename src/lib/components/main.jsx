import PlayWithChapi from './play-with-chapi';
import LaPlataJs from './la-plata-js';
import React from 'react';
import Slide from './slide';
import TalkingGame from './talking-game';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playWithChapi: false
    };
    this.togglePlayWithChapi = this.togglePlayWithChapi.bind(this);
  }

  togglePlayWithChapi() {
    this.setState({
      playWithChapi: !this.state.playWithChapi
    });
  }

  renderPlayWithChapi() {
    if (this.state.playWithChapi) {
      return (
        <div className='fullheight'>
          <TalkingGame />
          <LaPlataJs onClick={this.togglePlayWithChapi} />
        </div>
      );
    }
  }

  renderPresentation() {
    if (!this.state.playWithChapi) {
      return (
        <div>
          <Slide frameUrl={this.props.frameUrl} />
          <PlayWithChapi onClick={this.togglePlayWithChapi} />
        </div>
      );
    }
  }

  render() {
    return (
      <div className='fullheight'>
        {this.renderPlayWithChapi()}
        {this.renderPresentation()}
      </div>
    );
  }
};

Main.propTypes = {
  frameUrl: React.PropTypes.string.isRequired
};

export default Main;
