import React, { PropTypes } from 'react';
import TinyFlux from 'tinyflux';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';

let TodoItem = React.createClass({
  mixins:[TinyFlux.ComponentMixin],
  getInitialState() {
    return {
      editing: false
    };
  },

  handleDoubleClick() {
    this.setState({ editing: true });
  },

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
    this.setState({ editing: false });
  },

  render() {
    
    const {todo, completeTodo, deleteTodo} = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.get('text')}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.get('id'), text)} />
      );
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={todo.get('completed')}
                 onChange={() => completeTodo(todo.get('id'))} />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.get('text')}
          </label>
          <button className="destroy"
                  onClick={()=>deleteTodo(todo.get('id'))} />
        </div>
      );
    }

    return (
      <li className={classnames({
        completed: todo.get('completed'),
        editing: this.state.editing
      })}>
        {element}
      </li>
    );
  }
});

export default TodoItem;