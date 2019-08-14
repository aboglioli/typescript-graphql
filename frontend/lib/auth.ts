import Router from 'next/router';
import nextCookies from 'next-cookies';
import cookie from 'js-cookie';

export function login(token: string) {
  cookie.set('token', token, { expires: 1 });
  Router.push('/');
}

export function logout() {
  cookie.remove('token');
  Router.push('/login');
}

export function redirect(res:)

export const redirect = (res, target) => {
  if (res) {
    // Server
    res.writeHead(302, { Location: target || '/unauthorized' });
    res.end();
    return;
  }

  // Client
  Router.replace(target);
};

export const getToken = ctx => {
  const { token } = nextCookies(ctx);
  return token;
};
