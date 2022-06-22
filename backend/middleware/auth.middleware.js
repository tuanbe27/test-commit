const jwt = require('jsonwebtoken');

module.exports.authGuard = (req, res, next) => {
  try {
    const bearer = req.headers?.authorization;
    const token = bearer.slice(6).trim();
    // const token = req.cookies['authToken'];
    console.log('token', token)
    if (!token) {
      return res.status(401).json({
        error: 'Invalid request!',
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({
        error: 'Invalid request!',
      });
    }
    req.user = decodedToken;
    next();
  } catch {
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};
