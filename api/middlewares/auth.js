const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.token;
  const error = {
    code: '15',
    message: 'No token provided.'
  };

  if (!token) return res.status(401).json(error);

  jwt.verify(token, process.env.APP_KEY, (err, data) => {
    if (err) {
      error.code = '16',
      error.message = 'Invalid token';
      return res.status(401).json(error);
    }

    req.userId = data.id;

    return next();
  });
};