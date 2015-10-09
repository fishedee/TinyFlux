import TinyFlux from "tinyflux"
import React from "react"
import Store from "./store"
import Action from "./action"

let CounterApp = TinyFlux.createComponent({
	render(){
		return (
			<div>
				<div>{this.props.counter}</div>
				<button onClick={Action.increment}>increment</button>
				<button onClick={Action.decrement}>decrement</button>
			</div>
		);
	}
});

function mapStateToProps(){
	return {
		counter:Store.getState()
	}
}
export default TinyFlux.connect(mapStateToProps,CounterApp);