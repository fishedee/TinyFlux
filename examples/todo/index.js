import React, { PropTypes } from 'react';
import {Component} from 'tinyflux';
import Header from './components/Header';
import MainSection from './components/MainSection';
import TodoStore from './stores/TodoStore';
import 'todomvc-app-css/index.css';

class App extends Component {
  constructor(props){
  	super(props)
  	var store = new TodoStore();
  	this.connect(store,'todos');
  	this.actions = store.getActions();
  }
  render() {
    console.log(this.actions);
    console.log(typeof this.actions);
    return (
      <div>
        <Header addTodo={this.actions.addTodo} />
        <MainSection todos={this.state.todos} actions={this.actions} />
      </div>
    );
  }
}

React.render(
	<App/>,
	document.getElementById('app')
);