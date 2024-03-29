import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { NextPageContext } from 'next';
import fetch from 'isomorphic-unfetch';

import config from './config';
import { getToken, redirect } from './auth';

let apolloClient: ApolloClient<NormalizedCacheObject>;
const isBrowser = typeof window !== 'undefined';

const createClient = (
  initialState: NormalizedCacheObject,
  ctx?: NextPageContext,
) => {
  // Links
  const authLink = setContext((_, { headers }) => {
    const token = getToken(ctx);

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const httpLink = createHttpLink({
    uri: config.backendUrl,
    fetch: !isBrowser && fetch,
  });

  const redirectionLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors && graphQLErrors.length > 0) {
      const notLoggedIn = graphQLErrors.some(
        err => err.message === 'NOT_LOGGED_IN',
      );
      if (notLoggedIn) {
        redirect('/unauthorized', ctx);
      }
    }
  });

  // Client
  const client = new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: ApolloLink.from([authLink, redirectionLink, httpLink]),
    cache: new InMemoryCache().restore(initialState || {}),
  });

  return client;
};

export default function initApollo(
  initialState: NormalizedCacheObject,
  ctx?: NextPageContext,
) {
  // New client for every server-side request
  if (!isBrowser) {
    return createClient(initialState, ctx);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createClient(initialState, ctx);
  }

  return apolloClient;
}
