import Immutable from 'immutable';
import TinyFlux from 'tinyflux';
import 'isomorphic-fetch';

export default {
	getInitialState(){
		return Immutable.fromJS({});
	},
	requestBegin(name){
		this.state = this.state.set(name,Immutable.fromJS({
			isFetching: true,
			errorMessage: null,
			data:null,
		}));
	},
	requestSuccess(name,data){
		console.log(data);
		this.state = this.state.update(name,(singleData)=>{
			singleData = singleData.set('isFetching',false);
			singleData = singleData.set('errorMessage',null);
			singleData = singleData.set('data',Immutable.fromJS(data));
			return singleData;
		});
	},
	requestFail(name,message){
		console.log(this.state);
		this.state = this.state.update(name,(singleData)=>{
			singleData = singleData.set('isFetching',false);
			singleData = singleData.set('errorMessage',message);
			return singleData;
		});
	},
	get(name){
		return this.state.get(name);
	},
	async _fetch(name){
		let url = await this._getUrl(name);
		let response = await fetch('https://api.github.com'+url);
		let json = await response.json();
		if( response.ok )
			return {
				data:json
			};
		else
			return {
				error:json.message || '网络错误'
			};
	},
	async fetch(name){
		if( this.state.has(name) )
			return Promise.resolve();
		
		this.requestBegin(name);
		let response = await this._fetch(name);
		if( !response.error )
			this.requestSuccess(name,response.data);
		else
			this.requestFail(name,response.error);
	}
}