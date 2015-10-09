import React, { Component, PropTypes } from 'react';
import TinyFlux from 'tinyflux';
import UserStore from '../stores/UserStore';
import UserAction from '../actions/UserAction';
import StarStore from '../stores/StarStore';
import StarAction from '../actions/StarAction';
import User from '../components/User';
import Repo from '../components/Repo';
import List from '../components/List';

let UserPage = React.createClass({
  componentDidMount() {
    const { name } = this.props;
    UserAction.fetch(name);
    StarAction.fetch(name);
  },

  handleLoadMoreClick() {
    const { name } = this.props;
    StarAction.fetchNext(name);
  },

  renderRepo(repo) {
    return (
      <Repo repo={repo}
            key={repo.get('fullName')} />
    );
  },

  render() {
    const { user , star } = this.props;
    const { name } = this.props;
    if (!user || !star || user.get('isFetching') ){
      return <h1><i>Loading {name}’s profile...</i></h1>;
    }
    console.log(user.toJS());
    console.log(star.toJS());
    return (
      <div>
        <User user={user.get('data')} />
        <hr />
        <List renderItem={this.renderRepo}
              items={star}
              onLoadMoreClick={this.handleLoadMoreClick}
              loadingLabel={`Loading ${name}’s starred...`}
              items={star.get('items')}
              isFetching={star.get('isFetching')}
              nextPageUrl={star.get('nextPageUrl')}
              pageCount={star.get('pageCount')} 
        />
      </div>
    );
  }
});

let UserPageConnect = TinyFlux.connect(function(){
   const { name } = this.props;
    return {
      name:name,
      user:UserStore.getState().get(name) || null,
      star:StarStore.getState().get(name) || null,
    };
},UserPage);

export default TinyFlux.createComponent({
  render:function(){
    const { login } = this.props.params;
    return (
      <UserPageConnect key={login} name={login} />
    );
  }
});