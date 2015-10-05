import React, { Component, PropTypes, findDOMNode } from 'react';
import TinyFlux from 'tinyflux';

const GITHUB_REPO = 'https://github.com/rackt/redux';

export default TinyFlux.createComponent({
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setInputValue(nextProps.value);
    }
  },

  getInputValue() {
    return findDOMNode(this.refs.input).value;
  },

  setInputValue(val) {
    // Generally mutating DOM is a bad idea in React components,
    // but doing this for a single uncontrolled field is less fuss
    // than making it controlled and maintaining a state for it.
    findDOMNode(this.refs.input).value = val;
  },

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleGoClick();
    }
  },

  handleGoClick() {
    this.props.onChange(this.getInputValue());
  },

  render() {
    return (
      <div>
        <p>Type a username or repo full name and hit 'Go':</p>
        <input size="45"
               ref="input"
               defaultValue={this.props.value}
               onKeyUp={this.handleKeyUp} />
        <button onClick={this.handleGoClick}>
          Go!
        </button>
        <p>
          Code on <a href={GITHUB_REPO} target="_blank">Github</a>.
        </p>
      </div>
    );
  }
});