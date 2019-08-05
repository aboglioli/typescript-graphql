import { Server as HttpServer } from 'http';

import startServer from '../src/server';

export default class Server {
  private app: HttpServer;

  public async start() {
    this.app = await startServer();
    return this.app;
  }

  public stop() {
    if (this.app) {
      this.app.close();
    }
  }

  public get host(): string {
    const { port } = this.app.address() as { port: number };
    return `http://localhost:${port}`;
  }
}
