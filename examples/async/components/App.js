import React, { Component, PropTypes } from 'react';
import TinyFlux from 'tinyflux';
import Picker from './Picker';
import Posts from './Post';
import RedditStore from '../stores/RedditStore';
import Immutable from 'immutable';

var Items = React.createClass({
  mixins:[TinyFlux.ComponentMixin],
  initialize() {
    this.listen(RedditStore);
  },
  getData(){
    let redditStoreData = RedditStore.getData();
    return {
      post:redditStoreData.get(this.props.selectedReddit) || Immutable.fromJS({
          isFetching:true,
          didInvalidate:false,
          items:[]
        })
    }
  },
  componentDidMount() {
    const { selectedReddit } = this.props;
    RedditStore.fetchPostsIfNeeded(selectedReddit);
  },
  handleRefreshClick(e) {
    e.preventDefault();
    const { selectedReddit } = this.props;
    RedditStore.invalidateReddit(selectedReddit);
    RedditStore.fetchPostsIfNeeded(selectedReddit);
  },
  render(){
    const items = this.state.post.get('items');
    const isFetching = this.state.post.get('isFetching');
    const lastUpdated = this.state.post.get('lastUpdated');
    return (
      <div>
         <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && items.size === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && items.size === 0 &&
          <h2>Empty.</h2>
        }
        {items.size > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={items} />
          </div>
        }
      </div>
    );
  }
});

export default React.createClass({
  mixins:[TinyFlux.ComponentMixin],
  getInitialState(){
    return {
      selectedReddit:'reactjs'
    }
  },
  handleChange(nextReddit) {
    this.setState({
      selectedReddit:nextReddit
    });
  },

  render() {
    const { selectedReddit } = this.state;
    return (
      <div>
        <Picker value={selectedReddit}
                onChange={this.handleChange}
                options={['reactjs', 'frontend']} />
        <Items key={selectedReddit} selectedReddit={selectedReddit}/>
      </div>
    );
  }
});