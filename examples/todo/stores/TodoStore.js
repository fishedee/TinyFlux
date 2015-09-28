import {Store} from "tinyflux";
import Immutable from "immutable";

export default class ToDoStore extends Store{
	constructor(){
		super();
		this.todos = Immutable.fromJS([]);
	}
	addTodo(text){
		let id = this.todos.reduce(
			(maxId,todo)=>Math.max(maxId,todo.get('id')),
			-1
		) + 1;
		this.todos = this.todos.push(Immutable.fromJS({
			text:text,
			id:id,
			completed:false
		}));
		this.trigger();
	}
	deleteTodo(id){
		console.log(id);
		this.todos = this.todos.filter(
			(todo)=>todo.get('id') != id
		);
		this.trigger();
	}
	editTodo(id,text){
		this.todos = this.todos.updateIn(
			[id,'text'],
			text
		);
		this.trigger();
	}
	completeTodo(id){
		this.todos = this.todos.updateIn(
			[id,'completed'],
			(completed)=>!completed
		)
		this.trigger();
	}
	completeAll(){
		let areAllMarked = this.todos.every(
			(todo)=>todo.completed
		);
		this.todos = this.todos.map(
			(todo)=>todo.set('completed',!areAllMarked)
		);
		this.trigger();
	}
	clearCompleted(){
		this.todos = this.todos.filter(
			(todo)=>todo.get('completed')==true
		)
		this.trigger();
	}
	get(){
		return this.todos;
	}
}