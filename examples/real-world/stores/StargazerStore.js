import GithubListStore from './GithubListStore'
import TinyFlux from 'tinyflux'
import Immutable from 'immutable'

export default TinyFlux.createStore({
	initialize(){
		this.connectFilter(GithubListStore,'data',(data)=>{
			return data.get('stargazer') || Immutable.fromJS({});
		});
	},
	onFetch(name){
		GithubListStore.fetch('stargazer',name,`/repos/${name}/stargazers`);
	},
	onFetchNext(name){
		GithubListStore.fetchNext('stargazer',name);
	},
	get(){
		return this.data;
	}
});