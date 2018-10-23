import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-flexbox-grid';

const Layout = props => (
  <Grid fluid>
    <div>
      {props.children}
    </div>
  </Grid>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
