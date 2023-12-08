const knex = require('knex');
const { Model, transaction } = require('objection');
const knexConfig = require('../../src/databases/knexfile');

let transactionInstance;
let knexInstance;
const setupTestDB = () => {
  beforeAll(async () => {
    knexInstance = await knex(knexConfig);
  });

  beforeEach(async () => {
    transactionInstance = await transaction.start(knexInstance);
    Model.knex(transactionInstance);
  });

  afterEach(async () => {
    if (transactionInstance) {
      await transactionInstance.rollback();
      Model.knex(knex);
    }
  });

  afterAll(async () => {
    await knexInstance.destroy();
  });
};

module.exports = setupTestDB;
