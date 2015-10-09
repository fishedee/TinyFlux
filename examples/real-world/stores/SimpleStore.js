import Immutable from 'immutable';
import TinyFlux from 'tinyflux';

export default function(){
	return TinyFlux.createStore({
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
		}
	});
}