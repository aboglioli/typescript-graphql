import Server from './server';

describe('Basic', () => {
  let server: Server;

  beforeAll(async () => {
    server = new Server();
    await server.start();
  });

  afterAll(() => server.stop());

  it('gets all users', async () => {
    server.cleanClient();
    const { users } = await server.client.request(
      `
        {
          users {
            id
          }
        }
      `,
    );

    expect(users).toEqual([{ id: 'user1' }, { id: 'user2' }]);
  });

  it('profile from not logged in user', async () => {
    server.cleanClient();
    try {
      await server.client.request(
        `
          {
            profile {
              id
            }
          }
        `,
      );
    } catch (err) {
      expect(err.response.errors[0].message).toBe('Not logged in');
    }
  });

  it('profile', async () => {
    server.loginClient('admin', 'admin');
    const { profile } = await server.client.request(
      `
        {
          profile {
            id
            username
          }
        }
      `,
    );
    expect(profile).toEqual({ id: 'user1', username: 'admin' });
  });

  it('log in user', async () => {
    server.cleanClient();
    const { login } = await server.client.request(
      `
        mutation login($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            token
            user {
              id
              username
            }
          }
        }
      `,
      {
        username: 'user',
        password: 'user',
      },
    );

    expect(login).toHaveProperty('token');
    expect(login).toHaveProperty('user');
    expect(typeof login.token).toBe('string');
    expect(login.user).toEqual({ id: 'user2', username: 'user' });
  });
});
