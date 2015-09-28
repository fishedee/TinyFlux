import TinyFlux from "tinyflux"
import React from "react"
import Store from "./store"

export default class CounterComponent extends TinyFlux.Component{
	constructor(props){
		super(props);
		this.store = new Store();
		this.connect(this.store,'counter');
	}
	render(){
		let actions = this.store.getActions();
		return (
			<div>
				<div>{this.state.counter}</div>
				<button onClick={actions.increment}>increment</button>
				<button onClick={actions.decrement}>decrement</button>
			</div>
		);
	}
}