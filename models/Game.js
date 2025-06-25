const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Platform = require('./Platform');

const Game = sequelize.define('Game', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  external_api_id: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  release_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  genre: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  platform: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  developer: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  publisher: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  cover_image_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  metacritic_score: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  rating: {
    type: DataTypes.ENUM('E', 'E10+', 'T', 'M', 'AO', 'RP'),
    defaultValue: 'RP',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'games',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['title'] },
    { fields: ['genre'] },
    { fields: ['platform'] },
    { fields: ['release_date'] },
  ],
});

// Game.belongsToMany(Platform, {
//   through: 'GamePlatform',
//   foreignKey: 'game_id',
//   otherKey: 'platform_id'
// });

module.exports = Game;