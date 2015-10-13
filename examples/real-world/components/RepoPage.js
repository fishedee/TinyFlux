import React, { PropTypes } from 'react';
import {Component,connect} from 'tinyflux';
import {StargazerStore,RepoStore} from '../stores/Store';
import Repo from '../components/Repo';
import User from '../components/User';
import List from '../components/List';

let RepoPageInner = Component.createClass({
  componentDidMount() {
    const { fullName } = this.props;
    RepoStore.fetch(fullName);
    StargazerStore.fetch(fullName);
  },

  handleLoadMoreClick() {
    const { fullName} = this.props;
    StargazerStore.fetchNext(fullName);
  },

  renderUser(user) {
    return (
      <User user={user}
            key={user.get('login')} />
    );
  },

  render() {
    const { repo, stargazer } = this.props;
    const { name } = this.props;
    if (!repo || !stargazer || repo.get('isFetching')) {
      return <h1><i>Loading {name} details...</i></h1>;
    }

    return (
      <div>
        <Repo repo={repo.get('data')}/>
        <hr />
        <List renderItem={this.renderUser}
              onLoadMoreClick={this.handleLoadMoreClick}
              loadingLabel={`Loading stargazers of ${name}...`}
              items={stargazer.get('items')}
              isFetching={stargazer.get('isFetching')}
              nextPageUrl={stargazer.get('nextPageUrl')}
              pageCount={stargazer.get('pageCount')}
        />
      </div>
    );
  }
});

let RepoPageConnect = connect(function(props){
   const { fullName,name } = props;
    return {
      name:name,
      fullName:fullName,
      stargazer:StargazerStore.get(fullName),
      repo:RepoStore.get(fullName),
    };
},RepoPageInner);

export default Component.createClass({
  render(){
    const { login, name } = this.props.params;
    let fullName = login+"/"+name;
    return (
      <RepoPageConnect key={fullName} fullName={fullName} name={name} />
    );
  }
});