// users/index.js
const express = require('express');
const usersController = require('./controller');
const { body } = require('express-validator');

const router = express.Router();

router.post('/register', [
  body('username').isLength({ min: 3 }).trim().escape(),
  body('name').isLength({ min: 3 }).trim().escape(),
  body('password').isLength({ min: 3 }),
  body('role').isIn(['teacher', 'student']),
  body('classId')
    .default(null)
    .custom((value, { req }) => {
      if (req.body.role === 'student') {
        if (value === null) {
          throw new Error('Class ID is required for students');
        }
        if (!Number.isInteger(Number(value))) {
          throw new Error('Class ID must be a number');
        }
      }
      return true;
    }),
], usersController.registerUser);

module.exports = router;