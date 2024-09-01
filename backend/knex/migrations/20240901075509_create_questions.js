/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('questions', function(table) {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('content').notNullable();
      table.integer('teacherId').unsigned().references('id').inTable('users').notNullable();
      table.integer('classId').unsigned().references('id').inTable('classes').notNullable();
      table.timestamps(true, true);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('questions');
  };
  