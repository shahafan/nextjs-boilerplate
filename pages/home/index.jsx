import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import { translate } from 'react-i18next';
import { Row, Col } from 'react-flexbox-grid';
import { loadGetInitialProps } from 'next/dist/lib/utils';
// hocs
import configureStore from '../../redux/store/configure-store';
import page from '../../hocs/page';
// libs
import NodeService from '../../util/node-service';
// actions
import { postsGetData } from '../../redux/actions/posts';
// components
import Post from '../../components/Posts/Post';
// styles
import styles from './home.scss';

/* eslint-disable react/prefer-stateless-function */

class Home extends React.Component {
  render() {
    const { user, posts, t } = this.props;
    const { data, isLoading, hasError } = posts;
    return (
      <React.Fragment>
        <Head>
          <title>{t('brand')}</title>
        </Head>
        <Row>
          <Col sm xs={12} >
            {data.map(post => <Post data={post} onClick={data => console.log(data)} />)}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

Home.getInitialProps = async (ctx) => {
  const { store, req } = ctx;
  const { dispatch } = store;
  await dispatch(postsGetData());
  return {
    ...await loadGetInitialProps(ctx),
  };
};

Home.propTypes = {
  user : PropTypes.objectOf(Object).isRequired,
  posts: PropTypes.objectOf(Object).isRequired,
};

const mapStateToProps = state => ({
  user : state.user,
  posts: state.posts,
});

const mapDispatchToProps = dispatch => ({
  postsGetData: data => dispatch(postsGetData(data)),
});

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(page(translate(['common'])(Home)));
