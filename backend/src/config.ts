import { config as configDotenv } from 'dotenv';
configDotenv();

const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    env,
    port: process.env.PORT,
  },
  test: {
    port: 0,
  },
  production: {},
} as any;

config.testing = { ...config.development, ...config.testing };
config.production = { ...config.development, ...config.production };

export default config[env];
