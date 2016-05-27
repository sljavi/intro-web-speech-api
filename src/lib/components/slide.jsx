import React from 'react';

var Slice = class Slide extends React.Component {
  render() {
    return (
      <iframe
        src={this.props.frameUrl}
        scrolling='no'
        frameBorder='0'
        webkitallowfullscreen mozallowfullscreen allowFullScreen
      ></iframe>
    );
  }
};

Slice.propTypes = {
  frameUrl: React.PropTypes.string.isRequired
};

export default Slice;
