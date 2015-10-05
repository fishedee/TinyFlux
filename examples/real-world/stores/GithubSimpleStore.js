import 'isomorphic-fetch';
import Immutable from 'immutable';
import TinyFlux from 'tinyflux';

export default TinyFlux.createStore({
	initialize(){
		this.data = Immutable.fromJS({});
	},
	_fetchBegin(bucket,name,trigger){
		this.data = this.data.setIn([bucket,name],Immutable.fromJS({
			isFetching: true,
			errorMessage: null,
			data:null,
		}));
		this.trigger();
	},
	_fetchHappyEnd(bucket,name,json,response){
		this.data = this.data.updateIn([bucket,name],(singleData)=>{
			singleData = singleData.set('isFetching',false);
			singleData = singleData.set('errorMessage',null);
			singleData = singleData.set('data',Immutable.fromJS(json));
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
	get(){
		return this.data;
	}
});