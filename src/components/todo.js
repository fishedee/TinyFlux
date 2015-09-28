import TinyFlux from "../tinyflux"
import ToDoStore from "../stores/todoStore"

export default class ToDo extends TinyFlux.Component{
	constructor(props){
		super(props);
		this.todoStore = new ToDoStore();
		this.connect(this.todoStore,'counter');
	}
	render(){
		return (
			<div>
				<div>{this.state.counter}</div>
				<button onClick={()=>this.todoStore.increment()}>increment</button>
				<button onClick={()=>this.todoStore.decrement()}>decrement</button>
			</div>
		);
	}
}