const db = require('../db');

class QuestionsService {
  getAllQuestions(classId) {
    const stmt = db.prepare('SELECT * FROM questions WHERE classId = ?');
    return stmt.all(classId);
  }

  getQuestionById(id) {
    const stmt = db.prepare('SELECT * FROM questions WHERE id = ?');
    return stmt.get(id);
  }

  createQuestion(questionData) {
    const stmt = db.prepare(`
      INSERT INTO questions (title, content, teacherId, classId)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(questionData.title, questionData.content, questionData.teacherId, questionData.classId);
    return this.getQuestionById(info.lastInsertRowid);
  }

  updateQuestion(id, questionData) {
    const stmt = db.prepare(`
      UPDATE questions
      SET title = ?, content = ?, teacherId = ?, classId = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    stmt.run(questionData.title, questionData.content, questionData.teacherId, questionData.classId, id);
    return this.getQuestionById(id);
  }

  deleteQuestion(id) {
    const stmt = db.prepare('DELETE FROM questions WHERE id = ?');
    stmt.run(id);
  }
}

module.exports = new QuestionsService();