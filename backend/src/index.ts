import startServer from './server';
import connectDb, { UserModel } from './models';

async function bootstrap() {
  try {
    await connectDb();
    console.log('[MONGO] Connected');

    await UserModel.findOne();
  } catch (err) {
    console.log('[MONGO] Error establishing connection');
    console.error(err);
  }

  try {
    const app = await startServer();
    console.log('[SERVER] Running on', app.address());
  } catch (err) {
    console.log('[SERVER] Error starting it up');
    console.error(err);
  }
}

bootstrap();
