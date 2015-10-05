import 'babel-core/polyfill';
import React from 'react';
import TinyFlux from 'tinyflux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route } from 'react-router';
import App from './components/App';
import UserPage from './components/UserPage';
import RepoPage from './components/RepoPage';

const history = createBrowserHistory();

React.render(
	<Router history={history}>
		<Route path="/" component={App}>
          <Route path="/:login/:name"
                 component={RepoPage} />
          <Route path="/:login"
                 component={UserPage} />
        </Route>
   	</Router>,
	document.getElementById('app')
);