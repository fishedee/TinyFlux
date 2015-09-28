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
		return (
			<div>
				<div>{this.state.counter}</div>
				<button onClick={()=>this.store.increment()}>increment</button>
				<button onClick={()=>this.store.decrement()}>decrement</button>
			</div>
		);
	}
}