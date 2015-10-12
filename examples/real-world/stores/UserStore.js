import SimpleStore from './SimpleStore'

export default class UserStore extends SimpleStore{
	_getUrl(name){
		return '/users/'+name;
	}
};