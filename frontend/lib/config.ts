const env = process.env.NODE_ENV || 'development';

interface Config {
  env: string;
  isBrowser: boolean;
  backendUrl: string;
  title: string;
}

const config: { [key: string]: Config } = {
  development: {
    env,
    isBrowser: typeof window !== 'undefined',
    backendUrl: 'http://localhost:4000',
    title: 'fullstack-graphql',
  },
};

config.test = { ...config.development, ...config.test };
config.production = { ...config.development, ...config.production };

export default config[env];
