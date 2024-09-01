// assignments/index.js
const express = require('express');
const assignmentsController = require('./controller');
const { authMiddleware, teacherAuthMiddleware } = require('../middleware/auth');
const router = express.Router();

router.get('/', authMiddleware, assignmentsController.getAllAssignments);
router.get('/:id', authMiddleware, assignmentsController.getAssignmentById);
router.post('/', teacherAuthMiddleware, assignmentsController.createAssignment);
router.put('/:id', teacherAuthMiddleware, assignmentsController.updateAssignment);
router.delete('/:id', teacherAuthMiddleware, assignmentsController.deleteAssignment);

module.exports = router;