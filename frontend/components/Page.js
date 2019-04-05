import React, { Component } from 'react';
import propTypes from 'prop-types';
import Meta from './Meta';

import Header from './Header';

class Page extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Meta />
        <Header />
        {children}
      </div>
    );
  }
}

Page.propTypes = {
  children: propTypes.node.isRequired,
};

export default Page;
