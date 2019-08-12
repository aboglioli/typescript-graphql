import * as Redis from 'ioredis';

import config from './config';

export default new Redis(config.redisPort, config.redisHost);
