const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const UserSession = require('../models/UserSession');

class AuthService {
  async generateToken(user) {
    const payload = { userId: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    await UserSession.create({
      user_id: user.id,
      token,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    
    return token;
  }

  async verifyPassword(password, passwordHash) {
    return await bcrypt.compare(password, passwordHash);
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async invalidateToken(token) {
    await UserSession.destroy({ where: { token } });
  }
}

module.exports = new AuthService();