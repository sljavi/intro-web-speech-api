import React from 'react';
import { VelocityComponent } from 'velocity-react';
import 'velocity-animate/velocity.ui';

class LaPlataJs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null
    };
  }

  componentDidMount() {
    this.state.interval = setInterval(this.shakeLaPlataJs.bind(this), 1000 * 30);
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
    this.state.interval = null;
  }

  shakeLaPlataJs() {
    this.refs.laPlataJs.runAnimation();
  }

  render() {
    return (
      <VelocityComponent ref='laPlataJs' animation='callout.tada' duration={500}>
        <img className='la-plata-js' onClick={this.props.onClick} src='images/la-plata-js.png' alt='LaPlataJs' />
      </VelocityComponent>
    );
  }
};

LaPlataJs.propTypes = {
  onClick: React.PropTypes.func.isRequired
};

export default LaPlataJs;
