import 'isomorphic-fetch';
import TinyFlux from 'tinyflux';

export default function(Store){
	return TinyFlux.createAction({
		async fetch(name,url){
			let data = Store.getState();
			if( data.has(name) )
				return Promise.resolve();
			
			Store.requestBegin(name);
			let response = await fetch('https://api.github.com'+url);
			let json = await response.json();
			if( response.ok )
				Store.requestSuccess(name,json);
			else
				Store.requestFail(name,json.message);
		}
	});
}