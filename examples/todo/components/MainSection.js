import React, { PropTypes } from 'react';
import TinyFlux from 'tinyflux';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.get('completed'),
  [SHOW_COMPLETED]: todo => todo.get('completed')
};

let MainSection = TinyFlux.createComponent({
  getInitialState() {
    return { 
      filter: SHOW_ALL 
    };
  },

  handleClearCompleted() {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.get('completed'));
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted();
    }
  },

  handleShow(filter) {
    this.setState({ filter });
  },

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props;
    if (todos.size > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.size}
               onChange={actions.completeAll} />
      );
    }
  },

  renderFooter(completedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.size - completedCount;

    if (todos.size) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted}
                onShow={this.handleShow} />
      );
    }
  },

  render() {
    const { todos, actions } = this.props;
    const { filter } = this.state;
    
    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce((count, todo) =>
      todo.get('completed') ? count + 1 : count,
      0
    );
    
    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem key={todo.get('id')} todo={todo} {...actions} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
});

export default MainSection;