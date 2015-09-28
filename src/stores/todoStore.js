import TinyFlux from "../tinyflux"

export default class ToDoStore extends TinyFlux.Store{
	constructor(){
		super();
		this.counter = 0;
	}
	increment(){
		this.counter++;
		this.trigger();
	}
	decrement(){
		this.counter--;
		this.trigger();
	}
	get(){
		return this.counter;
	}
}