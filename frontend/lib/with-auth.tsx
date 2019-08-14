import React, { Component } from 'react';
import { NextPageContext } from 'next';

import { getToken, redirect } from './auth';

const withAuth = WrappedComponent => {
  return class WithAuth extends Component {
    static displayName = `withAuth(${WrappedComponent.displayName ||
      'Component'})`;

    static async getInitialProps(ctx: NextPageContext) {
      const token = getToken(ctx);

      if (!token) {
        redirect('/unauthorized', ctx);
        return null;
      }

      let initialProps = {};
      if (WrappedComponent.getInitialProps) {
        initialProps = await WrappedComponent.getInitialProps(ctx);
      }

      return { ...initialProps, token };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withAuth;
