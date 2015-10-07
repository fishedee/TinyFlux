import 'isomorphic-fetch';
import Immutable from 'immutable';
import TinyFlux from 'tinyflux';

export default TinyFlux.createStore({
	initialize(){
		this.data = Immutable.fromJS({});
	},
	_fetchBegin(bucket,name){
		if( !this.data.hasIn([bucket,name]) ){
			this.data = this.data.setIn([bucket,name],Immutable.fromJS({
				isFetching: true,
				errorMessage: null,
			    items: [],
			    pageCount:0,
			    nextPageUrl:null
			}));
		}else{
			this.data = this.data.updateIn([bucket,name],(singleData)=>{
				return singleData.set('isFetching',true);
			});
		}
		this.trigger();
	},
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
	_fetchHappyEnd(bucket,name,json,response){
		this.data = this.data.updateIn([bucket,name],(singleData)=>{
			singleData = singleData.set('isFetching',false);
			singleData = singleData.set('errorMessage',null);
			singleData = singleData.update('pageCount',(single)=>{
				return single + 1;
			});
			singleData = singleData.update('items',(single)=>{
				return single.concat(Immutable.fromJS(json));
			});
			singleData = singleData.set('nextPageUrl',this._getNextPageUrl(response));
			return singleData;
		});
		this.trigger();
	},
	_fetchBadEnd(bucket,name,json,response){
		this.data = this.data.updateIn([bucket,name],(singleData)=>{
			singleData = singleData.set('isFetching',false);
			singleData = singleData.set('errorMessage',json.message);
			return singleData;
		});
		this.trigger();
	},
	onFetch(bucket,name,url){
		if( this.data.hasIn([bucket,name]) )
			return Promise.resolve();
		
		this._fetchBegin(bucket,name);
		return fetch('https://api.github.com'+url)
			.then(response =>
		      	response.json().then(json => ({ json, response }))
		    ).then(({ json, response }) => {
		    	if(!response.ok){
		    		this._fetchBadEnd(bucket,name,json,response);
		    	}else{
		    		this._fetchHappyEnd(bucket,name,json,response);
		    	}
		    });
	},
	onFetchNext(bucket,name){
		if( !this.data.hasIn([bucket,name]) )
			return Promise.resolve();
		let singleData = this.data.getIn([bucket,name]);
		if( singleData.get('isFetching') == true )
			return Promise.resolve();
		if( singleData.get('nextPageUrl') == null )
			return Promise.resolve();

		this._fetchBegin(bucket,name);
		return fetch(singleData.get('nextPageUrl'))
			.then(response =>
		      	response.json().then(json => ({ json, response }))
		    ).then(({ json, response }) => {
		    	if(!response.ok){
		    		this._fetchBadEnd(bucket,name,json,response);
		    	}else{
		    		this._fetchHappyEnd(bucket,name,json,response);
		    	}
		    });
	},
	getData(){
		return this.data;
	}
});