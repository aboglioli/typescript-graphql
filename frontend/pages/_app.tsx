import React from 'react';
import App, { Container, AppContext } from 'next/app';
import Head from 'next/head';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';

import '../styles/global.scss';
import '../lib/icons';
import withApollo from '../lib/with-apollo';

interface MyAppProps extends AppContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

class MyApp extends App<MyAppProps> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
