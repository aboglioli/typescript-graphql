import { Server as HttpServer } from 'http';

import startServer from '../src/server';

export default class Server {
  private app: HttpServer;

  async start() {
    this.app = await startServer();
    return this.app;
  }

  stop() {
    if (this.app) {
      this.app.close();
    }
  }

  get host(): string {
    const { port } = this.app.address() as { port: number };
    return `http://localhost:${port}`;
  }
}
