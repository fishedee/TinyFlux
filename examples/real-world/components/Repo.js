import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import {Component} from 'tinyflux';

export default Component.createClass({
  render() {
    const { repo } = this.props;
    let owner = repo.get('owner');
    let login = owner.get('login');
    let name = repo.get('name');
    let description = repo.get('description');

    return (
      <div className="Repo">
        <h3>
          <Link to={`/${login}/${name}`}>
            {name}
          </Link>
          {' by '}
          <Link to={`/${login}`}>
            {login}
          </Link>
        </h3>
        {description &&
          <p>{description}</p>
        }
      </div>
    );
  }
});