const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GameGenre = sequelize.define('GameGenre', {
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
  genre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'genres', key: 'id' },
    onDelete: 'CASCADE',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'game_genres',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = GameGenre;
