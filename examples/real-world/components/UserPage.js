import React, { Component, PropTypes } from 'react';
import TinyFlux from 'tinyflux';
import UserStore from '../stores/UserStore';
import StarStore from '../stores/StarStore';
import User from '../components/User';
import Repo from '../components/Repo';
import List from '../components/List';

let UserPage = TinyFlux.createComponent({
  initialize() {
    this.connectFilter(UserStore,'user',(data)=>{
      const { name } = this.props;
      return data.get(name) || null;
    });
    this.connectFilter(StarStore,'star',(data)=>{
      const { name } = this.props;
      return data.get(name) || null;
    });
  },

  componentDidMount() {
    const { name } = this.props;
    UserStore.fetch(name);
    StarStore.fetch(name);
  },

  handleLoadMoreClick() {
    const { name } = this.props;
    StarStore.fetchNext(name);
  },

  renderRepo(repo) {
    return (
      <Repo repo={repo}
            key={repo.get('fullName')} />
    );
  },

  render() {
    const { user , star } = this.state;
    const { name } = this.props;
    if (!user || !star || user.get('isFetching') ){
      return <h1><i>Loading {name}’s profile...</i></h1>;
    }

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

export default TinyFlux.createComponent({
  render:function(){
    const { login } = this.props.params;
    return (
      <UserPage key={login} name={login} />
    );
  }
});