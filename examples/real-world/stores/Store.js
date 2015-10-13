import RepoStore from './RepoStore';
import UserStore from './UserStore';
import StarStore from './StarStore';
import StargazerStore from './StargazerStore';

export default {
	RepoStore:new RepoStore(),
	UserStore:new UserStore(),
	StarStore:new StarStore(),
	StargazerStore:new StargazerStore()
};