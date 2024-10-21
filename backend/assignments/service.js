const db = require('../db');

class AssignmentsService {
  getAllAssignments() {
    return db.prepare('SELECT * FROM assignments').all();
  }

  getAssignmentsByTeacherId(teacherId, classId = null) {
    const stmt = classId
      ? db.prepare('SELECT * FROM assignments WHERE teacherId = ? AND classId = ?')
      : db.prepare('SELECT * FROM assignments WHERE teacherId = ?');
    return classId ? stmt.all(teacherId, classId) : stmt.all(teacherId);
  }

  getAssignmentsByClassId(classId) {
    return db.prepare('SELECT * FROM assignments WHERE classId = ?').all(classId);
  }

  getAssignmentById(id) {
    return db.prepare('SELECT * FROM assignments WHERE id = ?').get(id);
  }

  createAssignment(assignmentData) {
    const stmt = db.prepare(`
      INSERT INTO assignments (teacherId, classId, title, description)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(assignmentData.teacherId, assignmentData.classId, assignmentData.title, assignmentData.description);
    return this.getAssignmentById(info.lastInsertRowid);
  }

  updateAssignment(id, assignmentData) {
    const stmt = db.prepare(`
      UPDATE assignments
      SET title = ?, description = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    const info = stmt.run(assignmentData.title, assignmentData.description, id);
    if (info.changes === 0) {
      throw new Error('Assignment not found');
    }
    return this.getAssignmentById(id);
  }

  deleteAssignment(id) {
    const stmt = db.prepare('DELETE FROM assignments WHERE id = ?');
    const info = stmt.run(id);
    if (info.changes === 0) {
      throw new Error('Assignment not found');
    }
  }
}

module.exports = new AssignmentsService();
