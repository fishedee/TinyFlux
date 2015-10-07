import TinyFlux from "tinyflux";
import Immutable from "immutable";
import fetch from 'isomorphic-fetch';

export default TinyFlux.createStore({
	initialize(){
		this.data = Immutable.fromJS({});
	},
	onInvalidateReddit(reddit){
		this.data = this.data.setIn(
			[reddit,'didInvalidate'],
			true
		);
		this.trigger();
	},
	_requestPosts(reddit){
		this.data = this.data.set(reddit,Immutable.fromJS({
			isFetching:true,
			didInvalidate:false,
			items:[]
		}));
		this.trigger();
	},
	_receivePosts(reddit,json){
		this.data = this.data.set(reddit,Immutable.fromJS({
			isFetching:false,
			didInvalidate:false,
			items:json.data.children.map(child => child.data),
			lastUpdated:Date.now()
		}));
		this.trigger();
	},
	_fetchPosts(reddit){
		this._requestPosts(reddit);
		return fetch(`http://www.reddit.com/r/${reddit}.json`)
	      .then(response => response.json())
	      .then(json => this._receivePosts(reddit, json));
	},
	_shouldFetchPosts(reddit){
		let hasPost = this.data.has(reddit);
		if( !hasPost )
			return true;
		let post = this.data.get(reddit);
		if( post.get('isFetching') )
			return false;
		return post.get('didInvalidate');
	},
	onFetchPostsIfNeeded(reddit){
		if( this._shouldFetchPosts(reddit) ){
			return this._fetchPosts(reddit);	
		}else{
			return Promise.resolve();
		}
	},
	getData(){
		return this.data;
	}
});