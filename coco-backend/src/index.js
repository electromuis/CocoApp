import express from 'express';
import http from 'http';

import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { apolloContext } from './apollo'
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import * as resolvers from './resolvers/index.js'
import * as typeDefs from './schema.gql'
const schema = makeExecutableSchema({ typeDefs, resolvers });

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);

  const subscriptionServer = SubscriptionServer.create({
      // This is the `schema` we just created.
      schema,
      // These are imported from `graphql`.
      execute,
      subscribe,
      onOperation: (message, params, webSocket) => {
        return { ...params, context: apolloContext }
      },
      onConnect(connectionParams, webSocket, context) {
        console.log('Connected!')
      },
      onDisconnect(webSocket, context) {
        console.log('Disconnected!')
      },
  }, {
      // This is the `httpServer` we created in a previous step.
      server: httpServer,
      // Pass a different path here if your ApolloServer serves at
      // a different path.
      path: '/graphqlws',
  });

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer })
    ],
    context: apolloContext
  });

  await server.start();

  server.applyMiddleware({ app, cors: {credentials: true, origin: true} });
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);