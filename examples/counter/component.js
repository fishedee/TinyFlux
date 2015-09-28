import TinyFlux from "tinyflux"
import React from "react"
import Store from "./store"

export default class CounterComponent extends TinyFlux.Component{
	constructor(props){
		super(props);
		var store = new Store();
		this.connect(store,'counter');
		this.actions = store.getActions();
	}
	render(){
		return (
			<div>
				<div>{this.state.counter}</div>
				<button onClick={this.actions.increment}>increment</button>
				<button onClick={this.actions.decrement}>decrement</button>
			</div>
		);
	}
}