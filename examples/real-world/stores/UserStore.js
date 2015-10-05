import GithubSimpleStore from './GithubSimpleStore'
import TinyFlux from 'tinyflux'
import Immutable from 'immutable'

export default TinyFlux.createStore({
	initialize(){
		this.connectFilter(GithubSimpleStore,'data',(data)=>{
			return data.get('user') || Immutable.fromJS({});
		});
	},
	onFetch(name){
		return GithubSimpleStore.fetch('user',name,`/users/${name}`);
	},
	get(){
		return this.data;
	}
});