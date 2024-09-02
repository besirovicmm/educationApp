/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('classes').del()
    .then(function () {
      return knex('classes').insert([
        {id: 1, name: 'Second Class Name', description: 'Second Class'},
      ]);
    });
};