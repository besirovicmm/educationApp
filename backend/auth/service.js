const db = require('../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

class AuthService {
  authenticate(username, password) {
    try {
      const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

      if (!user) {
        throw new Error('User not found');
      }

      if (user.password !== password) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { id: user.id, role: user.role, classId: user.classId, name: user.name },
        JWT_SECRET
      );

      return {
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          classId: user.classId,
          name: user.name
        }
      };
    } catch (error) {
      console.error('Error authenticating user:', error.message);
      throw new Error('Authentication failed');
    }
  }

  logout(token) {
    // In a more complex system, you might invalidate the token here
    return { message: 'Logged out successfully' };
  }
}

module.exports = new AuthService();
