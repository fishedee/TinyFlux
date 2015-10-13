import {Store} from "tinyflux";
import Immutable from "immutable";

let RedditStore = Store.createClass({
	getInitialState(){
		return Immutable.fromJS({});
	},
	invalidateReddit(reddit){
		this.state = this.state.setIn(
			[reddit,'didInvalidate'],
			true
		);
	},
	_requestPosts(reddit){
		this.state = this.state.set(reddit,Immutable.fromJS({
			isFetching:true,
			didInvalidate:false,
			items:[]
		}));
	},
	_receivePosts(reddit,json){
		this.state = this.state.set(reddit,Immutable.fromJS({
			isFetching:false,
			didInvalidate:false,
			items:json.data.children.map(child => child.data),
			lastUpdated:Date.now()
		}));
	},
	_fetchPosts(reddit){
		this._requestPosts(reddit);
		return fetch(`http://www.reddit.com/r/${reddit}.json`)
	      .then(response => response.json())
	      .then(json => this._receivePosts(reddit, json));
	},
	_shouldFetchPosts(reddit){
		let hasPost = this.state.has(reddit);
		if( !hasPost )
			return true;
		let post = this.state.get(reddit);
		if( post.get('isFetching') )
			return false;
		return post.get('didInvalidate');
	},
	fetchPostsIfNeeded(reddit){
		if( this._shouldFetchPosts(reddit) ){
			return this._fetchPosts(reddit);	
		}else{
			return Promise.resolve();
		}
	},
	get(name){
		return this.state.get(name);
	}
});

export default new RedditStore;