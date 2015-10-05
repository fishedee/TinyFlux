import GithubListStore from './GithubListStore'
import TinyFlux from 'tinyflux'
import Immutable from 'immutable'

export default TinyFlux.createStore({
	initialize(){
		this.connectFilter(GithubListStore,'data',(data)=>{
			return data.get('star') || Immutable.fromJS({});
		});
	},
	onFetch(name){
		return GithubListStore.fetch('star',name,`/users/${name}/starred`);
	},
	onFetchNext(name){
		console.log('next'+name);
		return GithubListStore.fetchNext('star',name);
	},
	get(){
		return this.data;
	}
});