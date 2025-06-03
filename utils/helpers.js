const formatResponse = (data, message = 'Success', status = 200) => ({
  status,
  message,
  data,
});

const parsePagination = (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return input.trim().replace(/[<>"'&]/g, '');
  }
  return input;
};

module.exports = { formatResponse, parsePagination, sanitizeInput };