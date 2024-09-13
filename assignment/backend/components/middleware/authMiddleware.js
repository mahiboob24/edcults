const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // console.log('Incoming Headers:', req.headers);

  const token = req.header('Authorization').replace('Bearer ', '');
  
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, "ashjfdhjsh");
    req.user = { userId: verified.id };
    console.log("token is verified")
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

module.exports = authMiddleware;
