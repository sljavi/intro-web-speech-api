import React from 'react';
import { VelocityComponent } from 'velocity-react';
import 'velocity-animate/velocity.ui';

class PlayWithChapi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null
    };
  }

  componentDidMount() {
    this.state.interval = setInterval(this.shakeChapi.bind(this), 1000 * 30);
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
    this.state.interval = null;
  }

  shakeChapi() {
    this.refs.chapi.runAnimation();
  }

  render() {
    return (
      <VelocityComponent ref='chapi' animation='callout.tada' duration={500}>
        <img className='play-with-chapi' onClick={this.props.onClick} src='images/chapi.jpg' alt='chapi' />
      </VelocityComponent>
    );
  }
};

PlayWithChapi.propTypes = {
  onClick: React.PropTypes.func.isRequired
};

export default PlayWithChapi;
