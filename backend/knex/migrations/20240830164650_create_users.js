/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('users').then(function(exists) {
    if (!exists) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table.enum('role', ['student', 'teacher']).notNullable();
      table.integer('classId').references('id').inTable('classes').nullable();
      table.timestamps(true, true);
    });
    }
  })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
