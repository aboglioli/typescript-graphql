const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    env,
    isBrowser: typeof window !== 'undefined',
    backendUrl: 'http://localhost:4000',
    title: 'fullstack-graphql',
  },
  test: {},
  production: {},
};

config.test = { ...config.development, ...config.test };
config.production = { ...config.development, ...config.production };

export default config[env];
