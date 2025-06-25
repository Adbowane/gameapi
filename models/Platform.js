const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Game = require('./Game');

const Platform = sequelize.define('Platform', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  abbreviation: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  manufacturer: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  release_year: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'platforms',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});
// Platform.belongsToMany(Game, {
//   through: 'GamePlatform',
//   foreignKey: 'platform_id',
//   otherKey: 'game_id'
// });
module.exports = Platform;