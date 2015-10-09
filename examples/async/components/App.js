import React, { Component, PropTypes } from 'react';
import TinyFlux from 'tinyflux';
import Picker from './Picker';
import Posts from './Post';
import RedditStore from '../stores/RedditStore';
import RedditAction from '../actions/RedditAction';
import Immutable from 'immutable';

let Items = TinyFlux.createComponent({
  componentDidMount() {
    const { selectedReddit } = this.props;
    RedditAction.fetchPostsIfNeeded(selectedReddit);
  },
  handleRefreshClick(e) {
    e.preventDefault();
    const { selectedReddit } = this.props;
    RedditAction.invalidateReddit(selectedReddit);
    RedditAction.fetchPostsIfNeeded(selectedReddit);
  },
  render(){
    const items = this.props.post.get('items');
    const isFetching = this.props.post.get('isFetching');
    const lastUpdated = this.props.post.get('lastUpdated');
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

function mapStateToProps(){
  let redditStoreData = RedditStore.getState();
  return {
    post:redditStoreData.get(this.props.selectedReddit) || Immutable.fromJS({
        isFetching:true,
        didInvalidate:false,
        items:[]
      }),
    selectedReddit:this.props.selectedReddit
  }
}

let ConnectItems = TinyFlux.connect(mapStateToProps,Items);


export default TinyFlux.createComponent({
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
        <ConnectItems key={selectedReddit} selectedReddit={selectedReddit}/>
      </div>
    );
  }
});