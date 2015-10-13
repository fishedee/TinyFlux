import React, { PropTypes } from 'react';
import {Component,connect} from 'tinyflux';
import Header from './components/Header';
import MainSection from './components/MainSection';
import TodoStore from './stores/TodoStore';
import 'todomvc-app-css/index.css';

let App = Component.createClass({
  render() {
    return (
      <div>
        <Header addTodo={TodoStore.addTodo} />
        <MainSection todos={this.props.todos} actions={TodoStore} />
      </div>
    );
  }
});

function mapStateToProps(){
  return {
    todos:TodoStore.get()
  }
}

let ConnectApp = connect(mapStateToProps,App);

React.render(
	<ConnectApp/>,
	document.getElementById('app')
);