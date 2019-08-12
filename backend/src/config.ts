import { config as configDotenv } from 'dotenv';
configDotenv();

interface IConfig {
  env: string;
  port: number;

  jwtSecret: string;
  mongoHost: string;
  mongoPort: number;
  mongoDatabase: string;
  mongoUser: string;
  mongoPassword: string;

  redisHost: string;
  redisPort: number;
}

// Base config
const env = process.env.NODE_ENV || 'development';

const development: IConfig = {
  env,
  port: Number(process.env.PORT) || 4000,
  jwtSecret: process.env.JWT_SECRET || 'my-secret',

  mongoHost: process.env.MONGO_HOST || 'localhost',
  mongoPort: Number(process.env.MONGO_PORT) || 27017,
  mongoDatabase: process.env.MONGO_DATABASE || 'database',
  mongoUser: process.env.MONGO_USER || 'admin',
  mongoPassword: process.env.MONGO_PASSWORD || 'admin',

  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: Number(process.env.REDIS_PORT) || 6379,
};

const config: { [key: string]: IConfig } = {
  development,
  test: {
    ...development,
    port: 0,
  },
  production: {
    ...development,
  },
};

config.testing = { ...config.development, ...config.testing };
config.production = { ...config.development, ...config.production };

export default config[env];
