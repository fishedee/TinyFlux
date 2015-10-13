import React, { PropTypes } from 'react';
import {Component} from 'tinyflux';

export default Component.createClass({
  render() {
    return (
      <ul>
        {this.props.posts.map((post, i) =>
          <li key={i}>{post.get('title')}</li>
        )}
      </ul>
    );
  }
});