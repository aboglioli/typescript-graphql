import { NextPageContext } from 'next';
import Router from 'next/router';
import nextCookies from 'next-cookies';
import cookie from 'js-cookie';

import config from './config';

export function login(token: string) {
  cookie.set('token', token, { expires: 1 });
  Router.push('/');
}

export function logout() {
  cookie.remove('token');
  Router.push('/login');
}

export function redirect(target: string, ctx?: NextPageContext) {
  if (ctx && ctx.res) {
    // Server
    const { res } = ctx;
    res.writeHead(302, { Location: target || '/unauthorized' });
    res.end();
    return;
  }

  // Client
  Router.replace(target);
}

export function getToken(ctx: NextPageContext) {
  const cookies = config.isBrowser
    ? nextCookies({})
    : ctx && ctx.req
    ? nextCookies(ctx)
    : {};

  return cookies.token;
}
