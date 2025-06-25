const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CollectionGame = sequelize.define('CollectionGame', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  collection_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'collections', key: 'id' },
    onDelete: 'CASCADE',
  },
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'games', key: 'id' },
    onDelete: 'CASCADE',
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  personal_notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  play_time_hours: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  date_completed: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'collection_games',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = CollectionGame;
