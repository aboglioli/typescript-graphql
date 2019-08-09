import { config as configDotenv } from 'dotenv';
configDotenv();

interface Config {
  env: string;
  port: number;
  jwtSecret: string;
}

// Base config
const env = process.env.NODE_ENV || 'development';

const development: Config = {
  env,
  port: Number(process.env.PORT) || 4000,
  jwtSecret: process.env.JWT_SECRET || 'my-secret',
};

const config: { [key: string]: Config } = {
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
