import { GraphQLServer } from 'graphql-yoga';
import * as path from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';

async function bootstrap() {
  const schema = await buildSchema({
    emitSchemaFile: path.resolve(__dirname, '../dist/schema.gql'),
    resolvers: [__dirname + '/modules/**/*.resolver.js'],
  });

  const server = new GraphQLServer({
    schema,
  });

  server.start(() => console.log('Server running'));
}

bootstrap();
