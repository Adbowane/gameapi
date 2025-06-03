const { logAction } = require('../services/logService');

const errorHandler = async (error, req, res, next) => {
  console.error(error.stack);
  
  const errorDetails = {
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  };

  if (req.user?.userId) {
    await logAction(req.user.userId, 'error', null, null, null, {
      error: error.message,
      path: req.path,
    });
  }

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.errors.map(e => e.message),
    });
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      message: 'Duplicate entry',
      errors: error.errors.map(e => e.message),
    });
  }

  res.status(error.status || 500).json({
    message: error.message || 'Internal Server Error',
    ...errorDetails,
  });
};

module.exports = errorHandler;