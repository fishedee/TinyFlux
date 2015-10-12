import SimpleListStore from './SimpleListStore'

export default class StargazerStore extends SimpleListStore{
	_getUrl(name){
		return '/repos/'+name+'/stargazers';
	}
}