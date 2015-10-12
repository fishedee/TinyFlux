import SimpleListStore from './SimpleListStore'

export default class StarStore extends SimpleListStore{
	_getUrl(name){
		return '/users/'+name+'/starred';
	}
}