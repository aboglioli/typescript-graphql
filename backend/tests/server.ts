import { Server as HttpServer } from 'http';
import { GraphQLClient } from 'graphql-request';

import startServer from '../src/server';
import { users } from '../src/data';
import { generateAuthToken } from '../src/utils/user';

function loginUser(username: string, password: string) {
  return users.find(u => u.username === username && u.password === password);
}

export default class Server {
  private app: HttpServer;

  client: GraphQLClient;

  async start() {
    this.app = await startServer();
    return this.app;
  }

  stop() {
    if (this.app) {
      this.app.close();
    }
  }

  createClient(username?: string, password?: string) {
    if (username && password) {
      const user = loginUser(username, password);
      if (!user) {
        throw new Error('User does not exist');
      }

      const token = generateAuthToken(user.id);

      this.client = new GraphQLClient(this.host, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return;
    }

    this.client = new GraphQLClient(this.host);
  }

  get host(): string {
    const { port } = this.app.address() as { port: number };
    return `http://localhost:${port}`;
  }
}
