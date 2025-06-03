const ActivityLog = require('../models/ActivityLog');

const logAction = async (userId, action, tableName, recordId, oldValues, newValues, req = {}) => {
  try {
    await ActivityLog.create({
      user_id: userId,
      action,
      table_name: tableName,
      record_id: recordId,
      old_values: oldValues ? JSON.stringify(oldValues) : null,
      new_values: newValues ? JSON.stringify(newValues) : null,
      ip_address: req.ip || null,
      user_agent: req.headers?.['user-agent'] || null,
    });
  } catch (error) {
    console.error('Failed to log action:', error.message);
  }
};

module.exports = { logAction };