import SimpleStore from './SimpleStore'

export default class RepoStore extends SimpleStore{
	_getUrl(name){
		return '/repos/'+name;
	}
};