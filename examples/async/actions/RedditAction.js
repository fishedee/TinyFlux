import TinyFlux from "tinyflux";
import RedditStore from "../stores/RedditStore"
import fetch from 'isomorphic-fetch';

module.exports = TinyFlux.createAction({
	_fetchPosts(reddit){
		RedditStore.requestPosts(reddit);
		return fetch(`http://www.reddit.com/r/${reddit}.json`)
	      .then(response => response.json())
	      .then(json => RedditStore.receivePosts(reddit, json));
	},
	_shouldFetchPosts(reddit){
		let state = RedditStore.getState();
		let hasPost = state.has(reddit);
		if( !hasPost )
			return true;
		let post = state.get(reddit);
		if( post.get('isFetching') )
			return false;
		return post.get('didInvalidate');
	},
	invalidateReddit(reddit){
		RedditStore.invalidateReddit(reddit);
	},
	fetchPostsIfNeeded(reddit){
		if( this._shouldFetchPosts(reddit) ){
			return this._fetchPosts(reddit);	
		}else{
			return Promise.resolve();
		}
	},
});