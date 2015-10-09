import TinyFlux from "tinyflux";
import Immutable from "immutable";

export default TinyFlux.createStore({
	getInitialState(){
		return Immutable.fromJS({});
	},
	invalidateReddit(reddit){
		this.state = this.state.setIn(
			[reddit,'didInvalidate'],
			true
		);
	},
	requestPosts(reddit){
		this.state = this.state.set(reddit,Immutable.fromJS({
			isFetching:true,
			didInvalidate:false,
			items:[]
		}));
	},
	receivePosts(reddit,json){
		this.state = this.state.set(reddit,Immutable.fromJS({
			isFetching:false,
			didInvalidate:false,
			items:json.data.children.map(child => child.data),
			lastUpdated:Date.now()
		}));
	}
});