import React from 'react';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import NodeService from '../util/node-service';

// TODO expose file as React component and wrap in a <NoSSR> component
let ReactGA;
if (!NodeService.isServer()) {
  ReactGA = require('react-ga');
}

export default ComposedComponent => class WithAnalytics extends React.Component {
  constructor(props) {
    super(props);
    if (!NodeService.isServer()) {
      ReactGA.initialize(456);
    }
  }

  componentDidMount() {
    const page = window.location.pathname;
    ReactGA.set({ page });
    ReactGA.pageview(page);
  }

  static async getInitialProps(ctx) {
    return loadGetInitialProps(ComposedComponent, ctx);
  }

  render() {
    return <ComposedComponent {...this.props} />;
  }
};
