import startServer from './server';

async function bootstrap() {
  const app = await startServer();
  console.log('[SERVER] Running on', app.address());
}

bootstrap();
