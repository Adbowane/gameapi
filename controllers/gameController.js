const { Game, Platform, Genre, GamePlatform, GameGenre } = require('../models');
const { validationResult } = require('express-validator');
const { logAction } = require('../services/logService');

const createGame = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const gameData = req.body;
    const game = await Game.create(gameData);

    if (gameData.platforms) {
      await GamePlatform.bulkCreate(gameData.platforms.map(platform_id => ({
        game_id: game.id,
        platform_id,
      })));
    }

    if (gameData.genres) {
      await GameGenre.bulkCreate(gameData.genres.map(genre_id => ({
        game_id: game.id,
        genre_id,
      })));
    }

    await logAction(req.user.userId, 'create_game', 'games', game.id, null, gameData);
    res.status(201).json(game);
  } catch (error) {
    next(error);
  }
};

const getGames = async (req, res, next) => {
  try {
    const { title, genre, platform, page = 1, limit = 10 } = req.query;
    const where = {};
    if (title) where.title = { [Op.iLike]: `%${title}%` };
    if (genre) where.genre = genre;
    if (platform) where.platform = platform;

    const games = await Game.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      include: [Platform, Genre],
    });

    res.json({
      games: games.rows,
      total: games.count,
      pages: Math.ceil(games.count / limit),
    });
  } catch (error) {
    next(error);
  }
};

const getGameById = async (req, res, next) => {
  try {
    const game = await Game.findByPk(req.params.id, {
      include: [Platform, Genre],
    });
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (error) {
    next(error);
  }
};

const updateGame = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const game = await Game.findByPk(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });

    const oldValues = game.toJSON();
    await game.update(req.body);

    if (req.body.platforms) {
      await GamePlatform.destroy({ where: { game_id: game.id } });
      await GamePlatform.bulkCreate(req.body.platforms.map(platform_id => ({
        game_id: game.id,
        platform_id,
      })));
    }

    if (req.body.genres) {
      await GameGenre.destroy({ where: { game_id: game.id } });
      await GameGenre.bulkCreate(req.body.genres.map(genre_id => ({
        game_id: game.id,
        genre_id,
      })));
    }

    await logAction(req.user.userId, 'update_game', 'games', game.id, oldValues, req.body);
    res.json(game);
  } catch (error) {
    next(error);
  }
};

const deleteGame = async (req, res, next) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });

    await game.destroy();
    await logAction(req.user.userId, 'delete_game', 'games', game.id, game.toJSON(), null);
    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createGame, getGames, getGameById, updateGame, deleteGame };