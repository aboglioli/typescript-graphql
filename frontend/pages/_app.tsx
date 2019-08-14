import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';

import '../styles/global.scss';
import '../lib/icons';
import withApollo from '../lib/with-apollo';

class MyApp extends App {
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
