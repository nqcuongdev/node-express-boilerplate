const knex = require('knex');
const knexConfig = require('../../src/databases/knexfile');

const setupTestDB = () => {
  beforeAll(async () => {
    await knex(knexConfig).migrate.latest();
  });

  beforeEach(async () => {
    await Promise.all(Object.values(knexConfig).map((knexInstance) => knexInstance.seed.run()));
  });

  afterAll(async () => {
    await knex(knexConfig).destroy();
  });
};

module.exports = setupTestDB;
