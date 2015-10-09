import GithubSimpleListAction from './GithubSimpleListAction';
import StarStore from '../stores/StarStore';
import TinyFlux from 'tinyflux';

let SimpleStore = GithubSimpleListAction(StarStore);
module.exports = TinyFlux.createAction({
	async fetch(name){
		return await SimpleStore.fetch(name,`/users/${name}/starred`);
	},
	async fetchNext(name){
		return await SimpleStore.fetchNext(name);
	}
});