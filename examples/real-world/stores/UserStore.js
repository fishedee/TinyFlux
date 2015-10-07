import GithubSimpleStore from './GithubSimpleStore'
import TinyFlux from 'tinyflux'
import Immutable from 'immutable'

export default TinyFlux.createStore({
	initialize(){
		this.listen(GithubSimpleStore);
	},
	onFetch(name){
		return GithubSimpleStore.fetch('user',name,`/users/${name}`);
	},
	getData(){
		return GithubSimpleStore.getData().get('user') || Immutable.fromJS({});
	}
});