// auth/controller.js
const authService = require('./service');

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await authService.authenticate(username, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async logout(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const result = await authService.logout(token);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();