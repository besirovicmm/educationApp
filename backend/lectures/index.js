// lectures/index.js
const express = require('express');
const lecturesController = require('./controller');
const { authMiddleware, teacherAuthMiddleware } = require('../middleware/auth');
const router = express.Router();

router.get('/', authMiddleware, lecturesController.getAllLectures);
router.get('/:id', authMiddleware, lecturesController.getLectureById);
router.post('/', teacherAuthMiddleware, lecturesController.createLecture);
router.put('/:id', teacherAuthMiddleware, lecturesController.updateLecture);
router.delete('/:id', teacherAuthMiddleware, lecturesController.deleteLecture);

module.exports = router;