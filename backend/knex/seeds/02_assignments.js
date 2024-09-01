/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  // return knex('assignments').del()
  //   .then(function () {
  //     // Inserts seed entries
  //     return knex('assignments').insert([
  //       {
  //         id: 1,
  //         title: 'Math Homework',
  //         description: 'Solve the problems on page 23.',
  //         dueDate: '2023-10-15',
  //         teacherId: 1,
  //         classId: 1
  //       },
  //       {
  //         id: 2,
  //         title: 'Science Project',
  //         description: 'Research and present on a topic of your choice.',
  //         dueDate: '2023-11-01',
  //         teacherId: 1,
  //         classId: 1
  //       }
  //     ]);
  //   });
};
