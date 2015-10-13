import SimpleMixin from './SimpleMixin';
import {Store} from 'tinyflux';

export default Store.createClass({
	mixins:[SimpleMixin],
	_getUrl(name){
		return '/users/'+name;
	}
});