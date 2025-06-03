const { validationResult } = require('express-validator');
const User = require('../models/User');
const Game = require('../models/Game');
const ActivityLog = require('../models/ActivityLog');
const { logAction } = require('../services/logService');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password_hash'] },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const oldValues = user.toJSON();
    await user.update(req.body);
    await logAction(req.user.userId, 'update_user', 'users', user.id, oldValues, req.body);
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    await logAction(req.user.userId, 'delete_user', 'users', user.id, user.toJSON(), null);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const getActivityLogs = async (req, res, next) => {
  try {
    const { user_id, action, page = 1, limit = 10 } = req.query;
    const where = {};
    if (user_id) where.user_id = user_id;
    if (action) where.action = action;

    const logs = await ActivityLog.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [['created_at', 'DESC']],
    });

    res.json({
      logs: logs.rows,
      total: logs.count,
      pages: Math.ceil(logs.count / limit),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, updateUser, deleteUser, getActivityLogs };