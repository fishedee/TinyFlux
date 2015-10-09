import GithubSimpleListAction from './GithubSimpleListAction';
import StargazerStore from '../stores/StargazerStore';
import TinyFlux from 'tinyflux';

let SimpleStore = GithubSimpleListAction(StargazerStore);
module.exports = TinyFlux.createAction({
	async fetch(name){
		return await SimpleStore.fetch(name,`/repos/${name}/stargazers`);
	},
	async fetchNext(name){
		return await SimpleStore.fetchNext(name);
	}
});