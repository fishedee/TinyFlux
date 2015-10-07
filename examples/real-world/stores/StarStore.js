import GithubListStore from './GithubListStore'
import TinyFlux from 'tinyflux'
import Immutable from 'immutable'

export default TinyFlux.createStore({
	initialize(){
		this.listen(GithubListStore);
	},
	onFetch(name){
		return GithubListStore.fetch('star',name,`/users/${name}/starred`);
	},
	onFetchNext(name){
		return GithubListStore.fetchNext('star',name);
	},
	getData(){
		return GithubListStore.getData().get('star') || Immutable.fromJS({});
	}
});