import { request } from 'graphql-request';

import Server from './server';

describe('Basic', () => {
  let server: Server;

  beforeAll(async () => {
    server = new Server();
    await server.start();
  });

  afterAll(() => server.stop());

  it('retrieve users', async () => {
    const { users } = await request(
      server.host,
      `{
        users {
          id
        }
      }`,
    );

    expect(users).toEqual([{ id: 'user1' }, { id: 'user2' }]);
  });
});
