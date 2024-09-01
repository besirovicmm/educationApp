// comments/controller.js
const commentsService = require('./service');

class CommentsController {
  async getComments(req, res) {
    try {
      const { entityType, entityId } = req.params;
      const { id: userId, role } = req.user;
      const comments = await commentsService.getCommentsByEntity(entityType, entityId, userId, role);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createComment(req, res) {
    try {
      const { entityType, entityId } = req.params;
      const { id: userId } = req.user;
      const { content } = req.body;
      const newComment = await commentsService.createComment(entityType, entityId, userId,  content);
      res.status(201).json(newComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateComment(req, res) {
    try {
      const { commentId } = req.params;
      const { id: userId } = req.user;
      const { content } = req.body;
      const updatedComment = await commentsService.updateComment(commentId, userId,  content);
      res.json(updatedComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteComment(req, res) {
    try {
      const { commentId } = req.params;
      const { id: userId } = req.user;
      await commentsService.deleteComment(commentId, userId);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new CommentsController();