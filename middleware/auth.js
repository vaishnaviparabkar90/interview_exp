const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with the correct secret
    req.user = verified; // Attach the decoded user info to the request object
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token', error: error.message });
  }
};

module.exports = auth;
