const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Game = require('./Game');
const Platform = require('./Platform');

const GamePlatform = sequelize.define('GamePlatform', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Game,
      key: 'id',
    },
  },
  platform_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Platform,
      key: 'id',
    },
  },
}, {
  tableName: 'game_platforms',
  timestamps: false,
});

Game.belongsToMany(Platform, { through: GamePlatform });
Platform.belongsToMany(Game, { through: GamePlatform });

module.exports = GamePlatform;