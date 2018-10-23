import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import NodeService from '../util/node-service';
import { authLogin, login } from '../redux/actions/auth';
import { userFetchData } from '../redux/actions/user';

export default (ComposedComponent) => {
  class WithAuth extends React.Component {
    componentDidMount() {
      const { auth, login } = this.props;
      if (!auth.loggedIn) {
        // TODO - user isn't logged in
        login({ email: 'email@gmail.com', password: '123456' });
      }
    }

    componentWillReceiveProps(nextProps, nextContext) {
      const { auth, user, userFetchData } = nextProps;
      if (auth.loggedIn && Object.keys(user.data).length) {
        userFetchData();
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  WithAuth.getInitialProps = async (ctx) => {
    if (NodeService.isServer()) {
      const token = ctx.req.session && ctx.req.session.user && ctx.req.session.user.token;
      if (token) {
        ctx.store.dispatch(authLogin(token));
        await ctx.store.dispatch(userFetchData());
      } else {
        // await ctx.store.dispatch(login({email: 'santwarg@gmail.com', password: '123456'}));
      }
    }
    return {
      serverRendered: NodeService.isServer(),
      ...await loadGetInitialProps(ComposedComponent, ctx),
    };
  };

  WithAuth.propTypes = {
    serverRendered: PropTypes.bool.isRequired,
    auth          : PropTypes.objectOf(Object).isRequired,
    user          : PropTypes.objectOf(Object).isRequired,
    login         : PropTypes.func.isRequired,
    userFetchData : PropTypes.func.isRequired,
  };

  const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user,
  });

  const mapDispatchToProps = dispatch => ({
    login        : data => dispatch(login(data)),
    userFetchData: data => dispatch(userFetchData(data)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithAuth);
};
