import GithubSimpleStore from './GithubSimpleStore'
import TinyFlux from 'tinyflux'
import Immutable from 'immutable'

export default TinyFlux.createStore({
	initialize(){
		this.listen(GithubSimpleStore);
	},
	onFetch(fullName){
		return GithubSimpleStore.fetch('repo',fullName,`/repos/${fullName}`);
	},
	getData(){
		return GithubSimpleStore.getData().get('repo') || Immutable.fromJS({});
	}
});