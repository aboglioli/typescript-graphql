/* eslint '@typescript-eslint/no-var-requires': 0 */
jest.mock('../src/redis', () => {
  const Redis = require('ioredis-mock');
  return { default: new Redis() };
});
