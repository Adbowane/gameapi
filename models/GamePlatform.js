const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GamePlatform = sequelize.define('GamePlatform', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'games', key: 'id' },
    onDelete: 'CASCADE',
  },
  platform_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'platforms', key: 'id' },
    onDelete: 'CASCADE',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'game_platforms',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = GamePlatform;
