import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ title, children }) => (
  <div>
    <span>
      {title}
    </span>
    {children}
  </div>
);

const <%= componentName %> = () => (
  <Container title="Some Title">
    Hello from <%= componentName %>
  </Container>
);

export default <%= componentName %>;


Container.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Container.defaultProps = {
  title: 'Some Title',
};
