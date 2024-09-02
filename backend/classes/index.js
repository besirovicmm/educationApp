// classes/index.js
const express = require('express');
const classesController = require('./controller');
const { authMiddleware, teacherAuthMiddleware } = require('../middleware/auth');
const router = express.Router();

router.get('/', classesController.getAllClasses);
router.get('/:id', authMiddleware, classesController.getClassById);
router.post('/', teacherAuthMiddleware, classesController.createClass);
router.put('/:id', teacherAuthMiddleware, classesController.updateClass);
router.delete('/:id', teacherAuthMiddleware, classesController.deleteClass);

module.exports = router;