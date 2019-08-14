const env = process.env.NODE_ENV || 'development';

interface Config {
  env: string;
  isBrowser: boolean;
  backendUrl: string;
  title: string;
}

const development: Config = {
  env,
  isBrowser: typeof window !== 'undefined',
  backendUrl: 'http://localhost:4000',
  title: 'fullstack-graphql',
};

const config: { [key: string]: Config } = {
  development,
  test: {
    ...development,
  },
  production: {
    ...development,
  },
};

export default config[env];
