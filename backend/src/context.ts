import { Request } from 'express';
import { getUserId } from './utils';

export interface Context {
  userId?: string;
}

export default function context({ request }: { request: Request }): Context {
  let ctx: Context = {};

  // Get Authorization token
  const authorization = request && request.get('Authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '');
    ctx.userId = getUserId(token);
  }

  return ctx;
}
