const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
// const UserFavorite = require('../models/UserFavorite');
const { logAction } = require('../services/logService');

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ['password_hash'] },
      include: [{ model: Game, through: UserFavorite }],
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findByPk(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const oldValues = user.toJSON();
    const updateData = { ...req.body };
    if (req.body.password) {
      updateData.password_hash = await bcrypt.hash(req.body.password, 10);
      delete updateData.password;
    }

    await user.update(updateData);
    await logAction(req.user.userId, 'update_profile', 'users', user.id, oldValues, updateData);
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    next(error);
  }
};

const addFavoriteGame = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { game_id } = req.body;
    const favorite = await UserFavorite.create({
      user_id: req.user.userId,
      game_id,
    });

    await logAction(req.user.userId, 'add_favorite', 'user_favorites', favorite.id, null, { game_id });
    res.status(201).json({ message: 'Game added to favorites' });
  } catch (error) {
    next(error);
  }
};

const removeFavoriteGame = async (req, res, next) => {
  try {
    const favorite = await UserFavorite.findOne({
      where: { user_id: req.user.userId, game_id: req.params.gameId },
    });
    if (!favorite) return res.status(404).json({ message: 'Favorite not found' });

    await favorite.destroy();
    await logAction(req.user.userId, 'remove_favorite', 'user_favorites', favorite.id, favorite.toJSON(), null);
    res.json({ message: 'Game removed from favorites' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserProfile, updateUserProfile, addFavoriteGame, removeFavoriteGame };