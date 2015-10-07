import GithubListStore from './GithubListStore'
import TinyFlux from 'tinyflux'
import Immutable from 'immutable'

export default TinyFlux.createStore({
	initialize(){
		this.listen(GithubListStore);
	},
	onFetch(name){
		GithubListStore.fetch('stargazer',name,`/repos/${name}/stargazers`);
	},
	onFetchNext(name){
		GithubListStore.fetchNext('stargazer',name);
	},
	getData(){
		return GithubListStore.getData().get('stargazer') || Immutable.fromJS({});
	}
});