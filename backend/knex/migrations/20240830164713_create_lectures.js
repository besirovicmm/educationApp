/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('lectures', function(table) {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('content');
      table.integer('teacherId').unsigned().references('id').inTable('users');
      table.integer('classId').unsigned().references('id').inTable('classes');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('lectures');
  };