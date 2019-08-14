import React, { Component } from 'react';

import { getToken, redirect } from './auth';

const withAuth = WrappedComponent => {
  return class WithAuth extends Component {
    static displayName = `withAuth(${WrappedComponent.displayName ||
      'Component'})`;

    static async getInitialProps(ctx) {
      const token = getToken(ctx);

      if (!token) {
        redirect(ctx.res, '/unauthorized');
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
