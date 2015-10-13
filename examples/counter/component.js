import {Component,connect} from "tinyflux"
import React from "react"
import Store from "./store"

let CounterApp = Component.createClass({
	render(){
		return (
			<div>
				<div>{this.props.counter}</div>
				<button onClick={Store.increment}>increment</button>
				<button onClick={Store.decrement}>decrement</button>
			</div>
		);
	}
});

function mapStateToProps(){
	return {
		counter:Store.get()
	}
}
export default connect(mapStateToProps,CounterApp);