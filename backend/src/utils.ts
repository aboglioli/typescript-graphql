import { verify, sign } from 'jsonwebtoken';

import config from './config';

export function getUserId(token: string): string {
  const { id } = verify(token, config.jwtSecret) as { id: string };
  return id;
}

export function generateAuthToken(id: string): string {
  return sign({ id }, config.jwtSecret);
}
