import TinyFlux from "tinyflux"

export default TinyFlux.createStore({
	initialize(){
		this.counter = 0;
	},
	onIncrement(){
		this.counter++;
		this.trigger();
	},
	onDecrement(){
		this.counter--;
		this.trigger();
	},
	get(){
		return this.counter;
	}
});