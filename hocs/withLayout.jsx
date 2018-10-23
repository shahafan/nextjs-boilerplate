import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import { authLogOut } from '../redux/actions/auth';
import Layout from '../components/MainLayout';

export default (ComposedComponent) => {
  class WithLayout extends React.Component {
    static async getInitialProps(ctx) {
      return loadGetInitialProps(ComposedComponent, ctx);
    }

    render() {
      return (
        <Layout>
          <ComposedComponent {...this.props} />
        </Layout>
      );
    }
  }
  WithLayout.propTypes = {
    auth: PropTypes.shape({
      loggedIn: PropTypes.bool.isRequired,
    }).isRequired,
    user: PropTypes.objectOf(Object).isRequired,
  };

  const mapStateToProps = state => ({
    auth     : state.auth,
    user     : state.user,
    checklist: state.checklist,
  });

  const mapDispatchToProps = dispatch => ({
    authLogOut: () => dispatch(authLogOut()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithLayout);
};
