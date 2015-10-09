import TinyFlux from "tinyflux";
import Immutable from "immutable";
import Store from '../stores/TodoStore';

export default TinyFlux.createAction({
	addTodo(text){
		Store.addTodo(text);
	},
	deleteTodo(id){
		Store.deleteTodo(id);
	},
	editTodo(id,text){
		Store.editTodo(id,text);
	},
	completeTodo(id){
		Store.completeTodo(id);
	},
	completeAll(){
		Store.completeAll();
	},
	clearCompleted(){
		Store.clearCompleted();
	}
});