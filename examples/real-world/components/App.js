import React, { Component } from 'react';
import TinyFlux from 'tinyflux';
import Explore from '../components/Explore';
import { PropTypes } from 'react-router'

 class App extends TinyFlux.Component{
  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(nextValue) {
    this.context.history.pushState(null, `/${nextValue}`);
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

App.contextTypes = { history: PropTypes.history }

export default App;
