import GithubSimpleAction from './GithubSimpleAction';
import UserStore from '../stores/UserStore';
import TinyFlux from 'tinyflux';

let SimpleStore = GithubSimpleAction(UserStore);
module.exports = TinyFlux.createAction({
	async fetch(name){
		return await SimpleStore.fetch(name,`/users/${name}`);
	},
	async fetchNext(name){
		return await SimpleStore.fetchNext(name);
	}
});