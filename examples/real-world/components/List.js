import React, { Component, PropTypes } from 'react';
import TinyFlux from 'tinyflux';

export default class List extends TinyFlux.Component{
  renderLoadMore() {
    const { isFetching, onLoadMoreClick } = this.props;
    return (
      <button style={{ fontSize: '150%' }}
              onClick={onLoadMoreClick}
              disabled={isFetching}>
        {isFetching ? 'Loading...' : 'Load More'}
      </button>
    );
  }

  render() {
    const {
      isFetching, nextPageUrl, pageCount,
      items, renderItem, loadingLabel
    } = this.props;

    const isEmpty = items.size === 0;
    if (isEmpty && isFetching) {
      return <h2><i>Loading...</i></h2>;
    }

    const isLastPage = !nextPageUrl;
    if (isEmpty && isLastPage) {
      return <h1><i>Nothing here!</i></h1>;
    }

    return (
      <div>
        {items.map(renderItem)}
        {pageCount > 0 && !isLastPage && this.renderLoadMore()}
      </div>
    );
  }
};