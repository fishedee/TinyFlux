import React, { PropTypes, Component } from 'react';
import TinyFlux from 'tinyflux';

export default React.createClass({
	mixins:[TinyFlux.ComponentMixin],
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