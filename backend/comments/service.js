// comments/service.js
const knex = require('../knex/knex');

class CommentsService {
  async getAllComments() {
    return knex('comments').select('*');
  }

  async getCommentsByEntity(entityType, entityId, userId, role) {
    let query = knex('comments')
      .join('users', 'comments.userId', 'users.id')
      .where('comments.entityType', entityType)
      .andWhere('comments.entityId', entityId)
      .select('comments.*', 'users.name as userName', 'users.role as userRole');

    if (entityType === 'question' && role === 'student') {
      // For students, only return their own comments on questions
      query = query.where('comments.userId', userId);
    }

    return query;
  }

  async createComment(entityType, entityId, userId, content) {
    console.log(userId);
    const [newComment] = await knex('comments').insert({
      entityType,
      entityId,
      userId,
      content
    }).returning('*');
    return newComment;
  }


  async updateComment(commentId, userId, content) {
    const [updatedComment] = await knex('comments')
      .where('id', commentId)
      .andWhere(function() {
        this.where('userId', userId)
      })
      .update({
        content,
        updated_at: new Date().toISOString()
      })
      .returning('*');

    if (!updatedComment) {
      throw new Error('Comment not found or unauthorized to update');
    }
    return updatedComment;
  }

  async deleteComment(commentId, userId) {
    const deletedCount = await knex('comments')
      .where('id', commentId)
      .andWhere(function() {
        this.where('userId', userId)
      })
      .del();

    if (deletedCount === 0) {
      throw new Error('Comment not found or unauthorized to delete');
    }
  }
}

module.exports = new CommentsService();