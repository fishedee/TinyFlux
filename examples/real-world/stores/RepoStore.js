import GithubSimpleStore from './GithubSimpleStore'
import TinyFlux from 'tinyflux'
import Immutable from 'immutable'

export default TinyFlux.createStore({
	initialize(){
		this.connectFilter(GithubSimpleStore,'data',(data)=>{
			return data.get('repo') || Immutable.fromJS({});
		});
	},
	onFetch(fullName){
		return GithubSimpleStore.fetch('repo',fullName,`/repos/${fullName}`);
	},
	get(){
		return this.data;
	}
});