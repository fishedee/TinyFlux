import React, { PropTypes } from 'react';
import TinyFlux from 'tinyflux';
import Header from './components/Header';
import MainSection from './components/MainSection';
import TodoStore from './stores/TodoStore';
import TodoAction from './actions/TodoAction';
import 'todomvc-app-css/index.css';

let App = TinyFlux.createComponent({
  render() {
    return (
      <div>
        <Header addTodo={TodoAction.addTodo} />
        <MainSection todos={this.props.todos} actions={TodoAction} />
      </div>
    );
  }
});

function mapStateToProps(){
  return {
    todos:TodoStore.getState()
  }
}

let ConnectApp = TinyFlux.connect(mapStateToProps,App);

React.render(
	<ConnectApp/>,
	document.getElementById('app')
);