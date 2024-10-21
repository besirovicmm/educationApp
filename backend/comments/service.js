const db = require('../db');

class CommentsService {
  getAllComments() {
    return db.prepare('SELECT * FROM comments').all();
  }

  getCommentsByEntity(entityType, entityId, userId, role) {
    let sql = `
      SELECT comments.*, users.name as userName, users.role as userRole
      FROM comments
      JOIN users ON comments.userId = users.id
      WHERE comments.entityType = ? AND comments.entityId = ?
    `;
    
    if (entityType === 'question' && role === 'student') {
      sql += ' AND comments.userId = ?';
      return db.prepare(sql).all(entityType, entityId, userId);
    } else {
      return db.prepare(sql).all(entityType, entityId);
    }
  }

  createComment(entityType, entityId, userId, content) {
    const stmt = db.prepare(`
      INSERT INTO comments (entityType, entityId, userId, content)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(entityType, entityId, userId, content);
    return this.getCommentById(info.lastInsertRowid);
  }

  updateComment(commentId, userId, content) {
    const stmt = db.prepare(`
      UPDATE comments
      SET content = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND userId = ?
    `);
    const info = stmt.run(content, commentId, userId);
    if (info.changes === 0) {
      throw new Error('Comment not found or unauthorized to update');
    }
    return this.getCommentById(commentId);
  }

  deleteComment(commentId, userId) {
    const stmt = db.prepare('DELETE FROM comments WHERE id = ? AND userId = ?');
    const info = stmt.run(commentId, userId);
    if (info.changes === 0) {
      throw new Error('Comment not found or unauthorized to delete');
    }
  }

  getCommentById(id) {
    return db.prepare('SELECT * FROM comments WHERE id = ?').get(id);
  }
}

module.exports = new CommentsService();