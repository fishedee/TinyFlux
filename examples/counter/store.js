import {Store} from "tinyflux"

let CounterStore = Store.createClass({
	getInitialState(){
		return 0;
	},
	increment(){
		this.state += 1;
	},
	decrement(){
		this.state -= 1;
	},
	get(){
		return this.state;
	}
});

export default new CounterStore();