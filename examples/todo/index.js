import React, { PropTypes } from 'react';
import TinyFlux from 'tinyflux';
import Header from './components/Header';
import MainSection from './components/MainSection';
import TodoStore from './stores/TodoStore';
import 'todomvc-app-css/index.css';

let App = React.createClass({
  mixins:[TinyFlux.ComponentMixin],
  initialize(){
  	this.connect(TodoStore,'todos');
  },
  render() {
    return (
      <div>
        <Header addTodo={TodoStore.addTodo} />
        <MainSection todos={this.state.todos} actions={TodoStore} />
      </div>
    );
  }
});

React.render(
	<App/>,
	document.getElementById('app')
);