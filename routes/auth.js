const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { userValidationRules, loginValidationRules } = require('../middleware/validation');

router.post('/register', userValidationRules, authController.register);
router.post('/login', loginValidationRules, authController.login);
router.post('/logout', authController.logout);

module.exports = router;