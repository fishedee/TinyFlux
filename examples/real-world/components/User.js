import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import TinyFlux from 'tinyflux';

export default class User extends TinyFlux.Component{
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
};