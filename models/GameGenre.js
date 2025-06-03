const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Game = require('./Game');
const Genre = require('./Genre');

const GameGenre = sequelize.define('GameGenre', {
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
  genre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Genre,
      key: 'id',
    },
  },
}, {
  tableName: 'game_genres',
  timestamps: false,
});

Game.belongsToMany(Genre, { through: GameGenre });
Genre.belongsToMany(Game, { through: GameGenre });

module.exports = GameGenre;