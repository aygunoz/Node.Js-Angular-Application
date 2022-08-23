const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log(req.headers.Authorization);
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret');
    console.log(jwt);
    next();
  } catch (err) {
    res.status(401).json({
      message: 'Auth Failed!'
    })
  }
};
