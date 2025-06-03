/**
 * Middleware for validating request data using Joi schemas
 */
const validateRequest = (schema) => {
  return (req, res, next) => {
    if (!schema) return next();

    const { error } = schema.validate(req.body);
    
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      const validationError = new Error(errorMessage);
      validationError.statusCode = 400;
      return next(validationError);
    }
    
    next();
  };
};

module.exports = validateRequest;