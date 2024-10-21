const db = require('../db');

class ClassesService {
  getAllClasses() {
    return db.prepare('SELECT * FROM classes').all();
  }

  getClassById(id) {
    return db.prepare('SELECT * FROM classes WHERE id = ?').get(id);
  }

  createClass(classData) {
    const stmt = db.prepare(`
      INSERT INTO classes (name, description)
      VALUES (?, ?)
    `);
    const info = stmt.run(classData.name, classData.description);
    return this.getClassById(info.lastInsertRowid);
  }

  updateClass(id, classData) {
    const stmt = db.prepare(`
      UPDATE classes
      SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    const info = stmt.run(classData.name, classData.description, id);
    if (info.changes === 0) {
      throw new Error('Class not found');
    }
    return this.getClassById(id);
  }

  deleteClass(id) {
    const stmt = db.prepare('DELETE FROM classes WHERE id = ?');
    const info = stmt.run(id);
    if (info.changes === 0) {
      throw new Error('Class not found');
    }
  }
}

module.exports = new ClassesService();