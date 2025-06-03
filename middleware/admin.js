const { logAction } = require('../services/logService');

const adminMiddleware = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      await logAction(req.user.userId, 'unauthorized_admin_access', null, null, null, { path: req.path });
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;