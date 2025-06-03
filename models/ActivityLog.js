const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const ActivityLog = sequelize.define('ActivityLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id',
    },
  },
  action: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  table_name: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  record_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  old_values: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  new_values: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ip_address: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  user_agent: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'activity_logs',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  indexes: [
    { fields: ['user_id'] },
    { fields: ['action'] },
    { fields: ['table_name'] },
    { fields: ['created_at'] },
  ],
});

ActivityLog.belongsTo(User, { foreignKey: 'user_id' });

module.exports = ActivityLog;