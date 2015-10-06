import React, { PropTypes } from 'react';
import TinyFlux from 'tinyflux';
import TodoTextInput from './TodoTextInput';

let Header = React.createClass({
  mixins:[TinyFlux.ComponentMixin],
  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  },

  render() {
    return (
      <header className="header">
          <h1>todos</h1>
          <TodoTextInput newTodo
                         onSave={this.handleSave}
                         placeholder="What needs to be done?" />
      </header>
    );
  }
});

export default Header;