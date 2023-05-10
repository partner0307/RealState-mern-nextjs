
function authenticateToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      req.token = bearerToken;
      next();
  }
  else {
    res.send("Not logged-in")
  }
}

module.exports = authenticateToken
