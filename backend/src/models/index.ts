import { connect } from 'mongoose';

import config from '../config';

export default function(connectionString?: string) {
  if (!connectionString) {
    const {
      mongoHost: host,
      mongoPort: port,
      mongoDatabase: database,
      mongoUser: user,
      mongoPassword: password,
    } = config;

    connectionString =
      user && password
        ? `mongodb://${user}:${password}@${host}:${port}/${database}`
        : `mongodb://${host}:${port}/${database}`;

    connectionString = `${connectionString}?authSource=admin`;
  }

  return connect(
    connectionString,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
    },
  );
}

export * from './user';
