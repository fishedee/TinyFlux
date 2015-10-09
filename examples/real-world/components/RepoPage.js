import React, { Component, PropTypes } from 'react';
import TinyFlux from 'tinyflux';
import StargazerStore from '../stores/StargazerStore';
import StargazerAction from '../actions/StargazerAction';
import RepoStore from '../stores/RepoStore';
import RepoAction from '../actions/RepoAction';
import Repo from '../components/Repo';
import User from '../components/User';
import List from '../components/List';

let RepoPage = TinyFlux.createComponent({
  componentDidMount() {
    const { fullName } = this.props;
    RepoAction.fetch(fullName);
    StargazerAction.fetch(fullName);
  },

  handleLoadMoreClick() {
    const { fullName} = this.props;
    StargazerAction.fetchNext(fullName);
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

let RepoPageConnect = TinyFlux.connect(function(){
   const { fullName,name } = this.props;
    return {
      name:name,
      fullName:fullName,
      stargazer:StargazerStore.getState().get(fullName) || null,
      repo:RepoStore.getState().get(fullName) || null,
    };
},RepoPage);

export default TinyFlux.createComponent({
  render:function(){
    const { login, name } = this.props.params;
    let fullName = login+"/"+name;
    return (
      <RepoPageConnect key={fullName} fullName={fullName} name={name} />
    );
  }
});