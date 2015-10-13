import React, { PropTypes } from 'react';
import {Component,connect} from 'tinyflux';
import {UserStore,StarStore} from '../stores/Store';
import User from '../components/User';
import Repo from '../components/Repo';
import List from '../components/List';

let UserPageInner = Component.createClass({
  
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

let UserPageConnect = connect(function(props){
  console.log(props);
   const { name } = props;
    return {
      name:name,
      user:UserStore.get(name) || null,
      star:StarStore.get(name) || null,
    };
},UserPageInner);

export default Component.createClass({
  render(){
    const { login } = this.props.params;
    return (
      <UserPageConnect key={login} name={login} />
    );
  }
});