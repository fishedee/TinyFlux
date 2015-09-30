import TinyFlux from "tinyflux";
import Immutable from "immutable";

export default TinyFlux.createStore({
	initialize(){
		this.todos = Immutable.fromJS([]);
	},
	onAddTodo(text){
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
	},
	onDeleteTodo(id){
		this.todos = this.todos.filter(
			(todo)=>todo.get('id') != id
		);
		this.trigger();
	},
	onEditTodo(id,text){
		this.todos = this.todos.map(
			(todo)=>todo.get('id')!=id?todo:todo.set('text',text)
		);
		this.trigger();
	},
	onCompleteTodo(id){
		this.todos = this.todos.map(
			(todo)=>todo.get('id')!=id?todo:todo.update('completed',(completed)=>!completed)
		);
		this.trigger();
	},
	onCompleteAll(){
		let areAllMarked = this.todos.every(
			(todo)=>todo.get('completed')
		);
		this.todos = this.todos.map(
			(todo)=>todo.set('completed',!areAllMarked)
		);
		this.trigger();
	},
	onClearCompleted(){
		this.todos = this.todos.filter(
			(todo)=>!todo.get('completed')
		)
		this.trigger();
	},
	get(){
		return this.todos;
	}
});