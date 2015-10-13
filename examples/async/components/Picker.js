import React, { PropTypes } from 'react';
import {Component} from 'tinyflux';

export default Component.createClass({
  render() {
    const { value, onChange, options } = this.props;

    return (
      <span>
        <h1>{value}</h1>
        <select onChange={e => onChange(e.target.value)}
                value={value}>
          {options.map(option =>
            <option value={option} key={option}>
              {option}
            </option>)
          }
        </select>
      </span>
    );
  }
});