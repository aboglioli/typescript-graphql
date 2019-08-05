import 'reflect-metadata';
import { GraphQLServer } from 'graphql-yoga';
import { buildSchema } from 'type-graphql';

import UserResolver from './resolvers/user';
import ProjectResolver from './resolvers/project';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [UserResolver, ProjectResolver],
    emitSchemaFile: true,
  });

  const server = new GraphQLServer({
    schema,
  })

  server.start(() => console.log('Server running'));
}

bootstrap();
