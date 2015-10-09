import Immutable from 'immutable';
import TinyFlux from 'tinyflux';

export default function(){
	return TinyFlux.createStore({
		getInitialState(){
			return Immutable.fromJS({});
		},
		requestBegin(name){
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
		},
		requestSuccess(name,data,nextPageUrl){
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
		},
		requestFail(name,message){
			console.log(this.state.toJS());
			this.state = this.state.update(name,(singleData)=>{
				singleData = singleData.set('isFetching',false);
				singleData = singleData.set('errorMessage',message);
				return singleData;
			});
		}
	});
};