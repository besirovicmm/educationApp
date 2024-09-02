// users/controller.js
const { validationResult } = require('express-validator');
const usersService = require('./service');

class UsersController {
  async registerUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, role, classId , name} = req.body;

    try {
      const newUser = await usersService.createUser({ username, password, role, classId, name });
      res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error registering user' });
    }
  }
}

module.exports = new UsersController();