const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const { gameValidationRules, idParamValidation } = require('../middleware/validation');

router.post('/', authMiddleware, adminMiddleware, gameValidationRules, gameController.createGame);
router.get('/', gameController.getGames);
router.get('/:id', idParamValidation, gameController.getGameById);
router.put('/:id', authMiddleware, adminMiddleware, gameValidationRules, idParamValidation, gameController.updateGame);
router.delete('/:id', authMiddleware, adminMiddleware, idParamValidation, gameController.deleteGame);

module.exports = router;