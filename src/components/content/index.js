import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ children }) => (
  <div>{ children }</div>
);

Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Content;
