import GithubSimpleAction from './GithubSimpleAction';
import RepoStore from '../stores/RepoStore';
import TinyFlux from 'tinyflux';

let SimpleStore = GithubSimpleAction(RepoStore);
module.exports = TinyFlux.createAction({
	async fetch(name){
		return await SimpleStore.fetch(name,`/repos/${name}`);
	},
	async fetchNext(name){
		return await SimpleStore.fetchNext(name);
	}
});