import React from 'react';
import {Component} from 'tinyflux';
import Explore from '../components/Explore';
import { History } from 'react-router'

export default  Component.createClass({
  mixins:[History],
  handleChange(nextValue) {
    this.props.history.pushState(null, `/${nextValue}`);
  },

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
});
