/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable().unique().index();
    table.string('password', 255).notNullable();
    table.string('about', 255).notNullable();
    table.string('avatar', 255).notNullable();
    table.string('contact_link', 255).notNullable();
    table.date('join_date').notNullable();
    table.string('role', 50).notNullable();
    table.string('status', 50).notNullable().defaultTo('active');
    table.boolean('is_email_verified').notNullable();
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
