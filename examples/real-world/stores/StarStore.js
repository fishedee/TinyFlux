import SimpleListMixin from './SimpleListMixin'
import {Store} from 'tinyflux';

export default Store.createClass({
	mixins:[SimpleListMixin],
	_getUrl(name){
		return '/users/'+name+'/starred';
	}
});