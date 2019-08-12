import './mock';
import { Server as HttpServer } from 'http';
import { GraphQLClient } from 'graphql-request';
import { Mongoose } from 'mongoose';

import config from '../src/config';
import startServer from '../src/server';
import connectDb, { UserModel } from '../src/models';
import Redis from '../src/redis';
import { generateAuthToken } from '../src/utils/user';

export default class Server {
  private app: HttpServer;
  private mongo: Mongoose;

  client: GraphQLClient;

  async start() {
    this.app = await startServer();
    return this.app;
  }

  stop() {
    if (this.app) this.app.close();
    if (this.mongo) this.mongo.disconnect();
    if (Redis.disconnect) Redis.disconnect();
  }

  async connectdb(prefix = '') {
    if (prefix) {
      config.mongoDatabase += `-${prefix}`;
    }
    this.mongo = await connectDb();

    // Reset databases
    for (let key in this.mongo.models) {
      await this.mongo.models[key].deleteMany({});
    }
  }

  async createClient(username?: string) {
    if (username) {
      const user = await UserModel.findOne({ username });
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
