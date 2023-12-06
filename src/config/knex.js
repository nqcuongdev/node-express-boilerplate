const knex = require('knex');
const config = require('./config');

const knexConfig = {
  client: config.database.type,
  connection: {
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
    charset: config.database.charset,
  },
  pool: { min: 2, max: 10 },
};

module.exports = knex(knexConfig);
