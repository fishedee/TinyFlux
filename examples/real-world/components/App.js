import React, { Component, PropTypes } from 'react';
import TinyFlux from 'tinyflux';
import Explore from '../components/Explore';
import { History } from 'react-router'

export default class App extends TinyFlux.Component{
  handleChange(nextValue) {
    this.props.history.pushState(null, `/${nextValue}`);
  }

  render() {
    // Injected by React Router
    const { location, children } = this.props;
    const { pathname } = location;
    const value = pathname.substring(1);

    return (
      <div>
        <Explore value={value}
                 onChange={this.handleChange} />
        <hr />
        {children}
      </div>
    );
  }
};
