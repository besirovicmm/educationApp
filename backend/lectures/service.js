const db = require('../db');

class LecturesService {
  getAllLectures() {
    return db.prepare('SELECT * FROM lectures').all();
  }

  getLecturesByTeacherId(teacherId, classId = null) {
    let stmt;
    if (classId) {
      stmt = db.prepare('SELECT * FROM lectures WHERE teacherId = ? AND classId = ?');
      return stmt.all(teacherId, classId);
    } else {
      stmt = db.prepare('SELECT * FROM lectures WHERE teacherId = ?');
      return stmt.all(teacherId);
    }
  }

  getLecturesByClassId(classId) {
    const stmt = db.prepare('SELECT * FROM lectures WHERE classId = ?');
    return stmt.all(classId);
  }

  getLectureById(id) {
    const stmt = db.prepare('SELECT * FROM lectures WHERE id = ?');
    return stmt.get(id);
  }

  createLecture(lectureData) {
    const stmt = db.prepare(`
      INSERT INTO lectures (title, content, teacherId, classId)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(lectureData.title, lectureData.content, lectureData.teacherId, lectureData.classId);
    return this.getLectureById(info.lastInsertRowid);
  }

  updateLecture(id, lectureData) {
    const stmt = db.prepare(`
      UPDATE lectures
      SET title = ?, content = ?, teacherId = ?, classId = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    const info = stmt.run(lectureData.title, lectureData.content, lectureData.teacherId, lectureData.classId, id);
    if (info.changes === 0) {
      throw new Error('Lecture not found');
    }
    return this.getLectureById(id);
  }

  deleteLecture(id) {
    const stmt = db.prepare('DELETE FROM lectures WHERE id = ?');
    const info = stmt.run(id);
    if (info.changes === 0) {
      throw new Error('Lecture not found');
    }
  }
}

module.exports = new LecturesService();