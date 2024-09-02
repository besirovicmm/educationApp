// users/service.js
const knex = require('../knex/knex');

class UsersService {
  async createUser({ username, password, role, classId, name }) {
    const [userId] = await knex('users').insert({
      username,
      password,
      role,
      classId: role === 'student' ? classId : null,
      name
    }).returning('id');

    return { id: userId };
  }
}

module.exports = new UsersService();