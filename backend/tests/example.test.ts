import Server from './server';

const SIGNUP_MUTATION = `
  mutation signup($data: SignupInput!) {
    signup(data: $data) {
      id
      username
      name
      email
      createdAt
    }
  }
`;

const LOGIN_MUTATION = `
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      id
      username
      name
      createdAt
    }
  }
}
`;

describe('Basic', () => {
  let server: Server;

  beforeAll(async () => {
    server = new Server();
    await server.start();
    await server.connectdb('auth');
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

  it('sign up user', async () => {
    server.createClient();
    const { signup } = await server.client.request(SIGNUP_MUTATION, {
      data: {
        username: 'user',
        password: '123456',
        name: 'User',
        email: 'user@user.com',
      },
    });

    expect(signup).toHaveProperty('id');
    expect(signup).toHaveProperty('username');
    expect(signup.username).toBe('user');
    expect(signup.name).toBe('User');
    expect(signup.email).toBe('user@user.com');
  });

  it('log in user', async () => {
    server.createClient();
    const { login } = await server.client.request(LOGIN_MUTATION, {
      username: 'user',
      password: '123456',
    });

    expect(login).toHaveProperty('token');
    expect(login).toHaveProperty('user');
    expect(typeof login.token).toBe('string');
    expect(login.user).toBeDefined();
    expect(login.user.name).toBe('User');
  });
});
