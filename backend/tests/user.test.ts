import { expect } from 'chai';
import { request } from 'graphql-request';

import Server from './server';

describe('Basic', () => {
  let server: Server;

  before(async () => {
    server = new Server();
    await server.start();
  });

  after(() => server.stop());

  it ('retrieve users', async () => {
    const { users } = await request(
      server.host,
      `{
        users {
          id
        }
      }`);

    expect(users).to.deep.equal([{id:'user1'},{id:'user2'}]);
  });
});
