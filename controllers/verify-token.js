var jwt = require('jsonwebtoken');
const config = require('./config');

function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    // var token = req.params.apiKey;

    if (!token) return res.json({status: 'failed', auth: false, message: 'No token provided'});

    jwt.verify(token, config.secret, function(err, decoded) {
      if (err || !decoded) return res.json({status: 'failed', auth: false, message: 'Invalid token'});

      // if everything good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    });
}

module.exports = verifyToken;