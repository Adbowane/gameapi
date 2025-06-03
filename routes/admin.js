const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const { userValidationRules, idParamValidation } = require('../middleware/validation');

router.get('/users', authMiddleware, adminMiddleware, adminController.getAllUsers);
router.put('/users/:id', authMiddleware, adminMiddleware, userValidationRules, idParamValidation, adminController.updateUser);
router.delete('/users/:id', authMiddleware, adminMiddleware, idParamValidation, adminController.deleteUser);
router.get('/logs', authMiddleware, adminMiddleware, adminController.getActivityLogs);

module.exports = router;