import { createHttpLink, InMemoryCache, makeVar, gql } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

export const tokenVar = makeVar(localStorage.getItem('token'));

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        token: {
          read() {
            return tokenVar()
          }
        }
      }
    }
  }
});

export const QUERY_TOKEN = require('./queries/token.gql');

const typeDefs = gql`
  extend type Query {
    token: String!
  }
`;

const httpLink = createHttpLink({
  uri: 'http://coco-backend.devlocal/graphql'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = tokenVar();
  // return the headers to the context so httpLink can read them

  //console.log(token)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export async function getClientOptions(/* {app, router, ...} */ options) {

  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  });

  return Object.assign(
    // General options.
    {
      link: authLink.concat(httpLink),
      cache,
      typeDefs
    },
    // Specific Quasar mode options.
    process.env.MODE === 'spa'
      ? {
          //
        }
      : {},
    process.env.MODE === 'ssr'
      ? {
          //
        }
      : {},
    process.env.MODE === 'pwa'
      ? {
          //
        }
      : {},
    process.env.MODE === 'bex'
      ? {
          //
        }
      : {},
    process.env.MODE === 'cordova'
      ? {
          //
        }
      : {},
    process.env.MODE === 'capacitor'
      ? {
          //
        }
      : {},
    process.env.MODE === 'electron'
      ? {
          //
        }
      : {},
    // dev/prod options.
    process.env.DEV
      ? {
          //
        }
      : {},
    process.env.PROD
      ? {
          //
        }
      : {},
    // For ssr mode, when on server.
    process.env.MODE === 'ssr' && process.env.SERVER
      ? {
          ssrMode: true,
        }
      : {},
    // For ssr mode, when on client.
    process.env.MODE === 'ssr' && process.env.CLIENT
      ? {
          ssrForceFetchDelay: 100,
        }
      : {}
  )
}
