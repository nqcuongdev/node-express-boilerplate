const path = require('path');
const config = require('../config/config');

module.exports = {
  client: config.database.type,
  connection: {
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
    charset: config.database.charset,
    timezone: 'utc',
  },
  pool: { min: 2, max: 10 },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, 'migrations'),
    getNewMigrationName: (name) => `${+new Date()}-${name}.js`,
  },
  seeds: {
    directory: path.join(__dirname, 'seeds'),
  },
};
