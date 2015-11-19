import {Store} from "tinyflux"

function setTimeoutAsync(timeout){
	return new Promise(function(resolve,reject){
		setTimeout(resolve,timeout);
	});
}
let CounterStore = Store.createClass({
	getInitialState(){
		return 0;
	},
	async fetch(){
		await setTimeoutAsync(100);
		this.state = Math.floor(Math.random()*100);
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