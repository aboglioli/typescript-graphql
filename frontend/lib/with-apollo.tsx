import React, { Component } from 'react';
import { AppContext } from 'next/app';
import Head from 'next/head';
import { ApolloClient } from 'apollo-client';
import { getDataFromTree } from '@apollo/react-ssr';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import initApollo from './apollo';
import { redirect } from './auth';

const withApollo = App => {
  return class WithApollo extends Component {
    static displayName = `withApollo(${App.displayName || 'All'})`;

    static async getInitialProps(appContext: AppContext) {
      const {
        Component,
        router,
        ctx,
      } = appContext;

      const { res } = ctx;

      let initialProps = {};
      if (App.getInitialProps) {
        initialProps = await App.getInitialProps(ctx);
      }

      const apollo = initApollo({}, ctx);

      if (res && res.finished) {
        // In case of redirection
        return {};
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (typeof window === 'undefined') {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...initialProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />,
          );
        } catch (err) {
          console.error('getDataFromTree:', err);
          return redirect(res, '/unauthorized');
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      const apolloState: NormalizedCacheObject = apollo.cache.extract();

      return {
        ...initialProps,
        apolloState,
      };
    }

    private apolloClient: ApolloClient<NormalizedCacheObject>;

    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState);
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};

export default withApollo;
