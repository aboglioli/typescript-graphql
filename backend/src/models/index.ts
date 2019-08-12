import { connect } from 'mongoose';

import config from '../config';

export default function() {
  const {
    mongoHost: host,
    mongoPort: port,
    mongoDatabase: database,
    mongoUser: user,
    mongoPassword: password,
  } = config;

  const connectionString =
    user && password
      ? `mongodb://${user}:${password}@${host}:${port}/${database}`
      : `mongodb://${host}:${port}/${database}`;

  return connect(
    `${connectionString}?authSource=admin`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
    },
  );
}

export * from './user';
