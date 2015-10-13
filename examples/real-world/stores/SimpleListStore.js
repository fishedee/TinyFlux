import Immutable from 'immutable';
import TinyFlux from 'tinyflux';
import 'isomorphic-fetch';

export default class SimpleListStore extends TinyFlux.Store{
	constructor(){
		super();
		this.state = Immutable.fromJS({});
	}
	_requestBegin(name){
		let data = this.state;
		if( !data.has(name) ){
			this.state = data.set(name,Immutable.fromJS({
				isFetching: true,
				errorMessage: null,
			    items: [],
			    pageCount:0,
			    nextPageUrl:null
			}));
		}else{
			this.state = data.update(name,(singleData)=>{
				return singleData.set('isFetching',true);
			});
		}
	}
	_requestSuccess(name,data,nextPageUrl){
		console.log(this.state.toJS());
		this.state = this.state.update(name,(singleData)=>{
			singleData = singleData.set('isFetching',false);
			singleData = singleData.set('errorMessage',null);
			singleData = singleData.update('pageCount',(single)=>{
				return single + 1;
			});
			singleData = singleData.update('items',(single)=>{
				return single.concat(Immutable.fromJS(data));
			});
			singleData = singleData.set('nextPageUrl',nextPageUrl);
			return singleData;
		});
	}
	_requestFail(name,message){
		console.log(this.state.toJS());
		this.state = this.state.update(name,(singleData)=>{
			singleData = singleData.set('isFetching',false);
			singleData = singleData.set('errorMessage',message);
			return singleData;
		});
	}
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
	}
	async _fetch(name,url){
		if( !url ){
			url = 'https://api.github.com' + await this._getUrl(name);
		}
		
		let response = await fetch(url);
		let json = await response.json();
		if( response.ok )
			return {
				data:json,
				nextPageUrl:this._getNextPageUrl(response)
			}
		else
			return {
				error:json.message || '网络错误'
			}
		return 
	}
	get(name){
		return this.state.get(name);
	}
	async fetch(name){
		if( this.state.has(name) )
			return Promise.resolve();
		
		this._requestBegin(name);
		let response = await this._fetch(name,null);
		if( !response.error )
			this._requestSuccess(name,response.data,response.nextPageUrl);
		else
			this._requestFail(name,response.error);
	}
	async fetchNext(name){
		if( !this.state.has(name) )
			return Promise.resolve();
		let singleData = this.state.get(name);
		if( singleData.get('isFetching') == true )
			return Promise.resolve();
		if( singleData.get('nextPageUrl') == null )
			return Promise.resolve();
		
		this._requestBegin(name);
		let response = await this._fetch(name,singleData.get('nextPageUrl'));
		if( !response.error )
			this._requestSuccess(name,response.data,response.nextPageUrl);
		else
			this._requestFail(name,response.error);
	}
};