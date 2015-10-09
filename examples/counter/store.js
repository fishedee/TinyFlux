import TinyFlux from "tinyflux"

export default TinyFlux.createStore({
	getInitialState(){
		return 0;
	},
	increment(){
		this.state += 1;
	},
	decrement(){
		this.state -= 1;
	}
});