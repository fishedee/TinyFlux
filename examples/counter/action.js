import TinyFlux from "tinyflux"
import Store from './store'

export default TinyFlux.createAction({
	increment(){
		Store.increment();
	},
	decrement(){
		Store.decrement();
	}
});