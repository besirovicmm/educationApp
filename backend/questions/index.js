// lectures/index.js
const express = require('express');
const QuestionsController = require('./controller');
const { authMiddleware, teacherAuthMiddleware } = require('../middleware/auth');
const router = express.Router();



// Question routes
router.get('/',authMiddleware, QuestionsController.getAllQuestions);
router.get('/:id',authMiddleware, QuestionsController.getQuestionById);

// Teacher-only routes
router.post('/', teacherAuthMiddleware, QuestionsController.createQuestion);
router.put('/:id', teacherAuthMiddleware, QuestionsController.updateQuestion);
router.delete('/:id', teacherAuthMiddleware, QuestionsController.deleteQuestion);

module.exports = router;
