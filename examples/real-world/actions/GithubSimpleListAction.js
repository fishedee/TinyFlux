import 'isomorphic-fetch';
import TinyFlux from 'tinyflux';

export default function(Store){
	return TinyFlux.createAction({
		_getNextPageUrl(response) {
			const link = response.headers.get('link');
			if (!link) {
				return null;
			}
			const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1);
			if (!nextLink) {
				return null;
			}
			return nextLink.split(';')[0].slice(1, -1);
		},
		async fetch(name,url){
			let data = Store.getState();
			if( data.has(name) )
				return Promise.resolve();
			
			Store.requestBegin(name);
			let response = await fetch('https://api.github.com'+url);
			let json = await response.json();
			if( response.ok )
				Store.requestSuccess(name,json,this._getNextPageUrl(response));
			else
				Store.requestFail(name,json.message);
		},
		async fetchNext(name){
			let data = Store.getState();
			if( !data.has(name) )
				return Promise.resolve();
			let singleData = data.get(name);
			if( singleData.get('isFetching') == true )
				return Promise.resolve();
			if( singleData.get('nextPageUrl') == null )
				return Promise.resolve();
			
			Store.requestBegin(name);
			let response = await fetch(singleData.get('nextPageUrl'));
			let json = await response.json();
			if( response.ok )
				Store.requestSuccess(name,json,this._getNextPageUrl(response));
			else
				Store.requestFail(name,json.message);
		}
	});
}