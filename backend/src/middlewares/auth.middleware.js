const jwt = require('jsonwebtoken');
const { UnauthorizedError, ForbiddenError } = require('../utils/CustomErrors');
const JWT_SECRET = process.env.JWT_SECRET || 'topsecret';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) throw new UnauthorizedError('Token not provided.');

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) throw new ForbiddenError('Invalid or expired token.');
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
