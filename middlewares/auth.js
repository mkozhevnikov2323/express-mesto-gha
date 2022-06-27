const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload = '123';

  try {
    payload = jwt.verify(token, '2e48302a6e4e6f4d364e51ef2d924411121f752eb4087571abe112de648773ff');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация!' });
  }
  req.user = payload;
  next();
};
