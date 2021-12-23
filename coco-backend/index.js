import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

import express from 'express';
import http from 'http';

const models = require('./models');
import jsonwebtoken from 'jsonwebtoken'
const secret = 'asdc0- m7qw789456378689aN&dw';

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  app.get('/hi', (req, res) => {
    res.send('Hello Worldd!')
  });

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    async context({req})
    {
      let token = req.headers.authorization || req.query.token || '';
      token = token.replace('Bearer ', '');
      let user = null;

      try {
        const decoded = jsonwebtoken.verify(
          token,
          secret
        );

        if(decoded)
        {
          user = await models.User.findByPk(decoded.id);
          if(!user || user.email !== decoded.email)
          {
            user = null;
          }
        }
      }
      catch
      {
        user = null
      }

      return { models, user }
    }
  });
  await server.start();
  server.applyMiddleware
  server.applyMiddleware({ app, cors: {credentials: true, origin: true} });
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

import * as typeDefs from './schema.gql'

import { ApolloError } from 'apollo-server-errors';
class MyError extends ApolloError {
  constructor(message) {
    super(message, 'MY_ERROR_CODE');

    Object.defineProperty(this, 'name', { value: 'MyError' });
  }
}

import * as resolvers from './resolvers/index.js'

startApolloServer(typeDefs, resolvers);