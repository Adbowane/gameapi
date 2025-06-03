const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const { userValidationRules, idParamValidation } = require('../middleware/validation');

router.get('/profile', authMiddleware, userController.getUserProfile);
router.put('/profile', authMiddleware, userValidationRules, userController.updateUserProfile);
router.post('/favorites', authMiddleware, idParamValidation, userController.addFavoriteGame);
router.delete('/favorites/:gameId', authMiddleware, idParamValidation, userController.removeFavoriteGame);

module.exports = router;