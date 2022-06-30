const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorization-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Необходима авторизация!');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, '2e48302a6e4e6f4d364e51ef2d924411121f752eb4087571abe112de648773ff');
  } catch (err) {
    throw new AuthorizationError('Необходима авторизация!');
  }
  req.user = payload;
  next();
};
