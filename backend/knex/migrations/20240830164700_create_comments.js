/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('comments', function(table) {
      table.increments('id').primary();
      table.enum('entityType', ['assignment', 'lecture','question']).notNullable();
      table.integer('entityId').notNullable();
      table.integer('userId').unsigned().references('id').inTable('users');
      table.text('content').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('comments');
  };