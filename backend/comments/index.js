// comments/index.js
const express = require('express');
const commentsController = require('./controller');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

router.get('/:entityType/:entityId', authMiddleware, commentsController.getComments);
router.post('/:entityType/:entityId', authMiddleware, commentsController.createComment);
router.put('/:commentId', authMiddleware, commentsController.updateComment);
router.delete('/:commentId', authMiddleware, commentsController.deleteComment);

module.exports = router;