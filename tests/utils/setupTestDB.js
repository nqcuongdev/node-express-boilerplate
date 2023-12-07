const knex = require('knex');
const knexConfig = require('../../src/databases/knexfile');

const setupTestDB = () => {
  beforeAll(async () => {
    await knex(knexConfig);
  });

  afterEach(async () => {
    const tables = ['users', 'tokens'];
    // eslint-disable-next-line no-restricted-syntax
    for (const table of tables) {
      // eslint-disable-next-line no-await-in-loop
      await knex(knexConfig).table(table).del();
    }
  });

  afterAll(async () => {
    await knex(knexConfig).destroy();
  });
};

module.exports = setupTestDB;
