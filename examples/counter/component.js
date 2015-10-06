import TinyFlux from "tinyflux"
import React from "react"
import Store from "./store"

export default React.createClass({
	mixins:[TinyFlux.ComponentMixin],
	initialize(){
		this.connect(Store,'counter');
	},
	render(){
		return (
			<div>
				<div>{this.state.counter}</div>
				<button onClick={Store.increment}>increment</button>
				<button onClick={Store.decrement}>decrement</button>
			</div>
		);
	}
});