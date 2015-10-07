import React, { Component, PropTypes } from 'react';
import TinyFlux from 'tinyflux';
import StargazerStore from '../stores/StargazerStore';
import RepoStore from '../stores/RepoStore';
import Repo from '../components/Repo';
import User from '../components/User';
import List from '../components/List';

let RepoPage = React.createClass({
  mixins:[TinyFlux.ComponentMixin],
  initialize(){
    this.listen(StargazerStore);
    this.listen(RepoStore);
  },
  getData(){
    const { fullName } = this.props;
    return {
      stargazer:StargazerStore.getData().get(fullName) || null,
      repo:RepoStore.getData().get(fullName) || null,
    };
  },
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
    const { repo, stargazer } = this.state;
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

export default React.createClass({
  mixins:[TinyFlux.ComponentMixin],
  render:function(){
    const { login, name } = this.props.params;
    let fullName = login+"/"+name;
    return (
      <RepoPage key={fullName} fullName={fullName} name={name} />
    );
  }
});