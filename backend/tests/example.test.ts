import Server from './server';

describe('Basic', () => {
  let server: Server;

  beforeAll(async () => {
    server = new Server();
    await server.start();
  });

  afterAll(() => server.stop());

  it('profile from not logged in user', async () => {
    server.createClient();
    try {
      await server.client.request(`
        {
          profile {
            id
          }
        }
      `);
    } catch (err) {
      expect(err.response.errors[0].message).toBe('UNAUTHORIZED');
    }
  });

  it('profile', async () => {
    server.createClient('admin', 'admin');
    const { profile } = await server.client.request(`
      {
        profile {
          id
          username
        }
      }
    `);
    expect(profile).toEqual({ id: 'user1', username: 'admin' });
  });

  it('log in user', async () => {
    server.createClient();
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

  it('retrieves projects from logged in user', async () => {
    server.createClient('user', 'user');
    const { profile } = await server.client.request(`
      {
        profile {
          id
          username
          projects {
            id
            name
            priority
            completed
          }
        }
      }
    `);

    expect(profile.username).toBe('user');
    expect(profile.projects).toHaveLength(2);
    expect(profile.projects[0].id).toBe('project2');
    expect(profile.projects[1].id).toBe('project5');
  });
});
