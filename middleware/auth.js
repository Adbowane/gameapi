const jwt = require('jsonwebtoken');
const UserSession = require('../models/UserSession');
const { logAction } = require('../services/logService');
const { Op } = require('sequelize');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const session = await UserSession.findOne({ where: { token, expires_at: { [Op.gt]: new Date() } } });
    if (!session) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId, role: decoded.role };
    
    await logAction(req.user.userId, 'access_protected_route', null, null, null, { path: req.path });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;