var router = require('express').Router();
const UserModel = require('../models/users');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const config = require('../controllers/config');

// Authentication
router.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    UserModel.find({email: req.body.email}, (err, user) => {
        if (err || user.length <= 0) return res.status(500).send({status: 'failed', message: 'there was a problem authenticating token'});

        if(user) {
            // create a token
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 600 // expires in 10 minutes
            });

            return res.json({status: 'success', token: token });
        }
    });
})

module.exports = router;