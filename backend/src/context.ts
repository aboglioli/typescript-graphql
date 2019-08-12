import { Request } from 'express';
import { getUserId } from './utils/user';

export interface IContext {
  userId?: string;
}

export default function context({ request }: { request: Request }): IContext {
  let ctx: IContext = {};

  // Get Authorization token
  const authorization = request && request.get('Authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '');
    ctx.userId = getUserId(token);
  }

  return ctx;
}
