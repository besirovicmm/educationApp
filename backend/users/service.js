const db = require('../db');

class UsersService {
  createUser({ username, password, role, classId, name }) {
    const stmt = db.prepare(`
      INSERT INTO users (username, password, role, classId, name)
      VALUES (?, ?, ?, ?, ?)
    `);

    const info = stmt.run(username, password, role, role === 'student' ? classId : null, name);

    return { id: info.lastInsertRowid };
  }
}

module.exports = new UsersService();