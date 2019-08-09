import { GraphQLServer } from 'graphql-yoga';
import * as path from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import * as cors from 'cors';

import config from './config';
import context from './context';
import resolvers from './modules';

export default async function start() {
  const schema = await buildSchema({
    emitSchemaFile: path.resolve(__dirname, '../dist/schema.gql'),
    resolvers,
  });

  const server = new GraphQLServer({
    schema,
    context,
  });

  server.express.use(cors());

  return server.start({ port: config.port });
}
