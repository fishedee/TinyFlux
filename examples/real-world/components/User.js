import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import {Component} from 'tinyflux';

export default Component.createClass({
  render() {
    const { user } = this.props;
    const login = user.get('login');
    const avatarUrl = user.get('avatar_url');
    const name = user.get('name');

    return (
      <div className="User">
        <Link to={`/${login}`}>
          <img src={avatarUrl} width="72" height="72" />
          <h3>
            {login} {name && <span>({name})</span>}
          </h3>
        </Link>
      </div>
    );
  }
});