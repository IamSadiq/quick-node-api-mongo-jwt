var express = require('express');
var router = express.Router();
var token_verifier = require('../controllers/verify-token');
var mailer = require('../controllers/mailer');

const User = require('../models/users');

var formidable = require('formidable');
var fs = require('fs');

// POST users listing
router.post('/', (req, res, next) => {
  req.body.verified = false;
  req.body.createdAt = Date.now().toString();

  User.create(req.body, (err, user) => {
    if (err) return res.status(500).send({status: 'failed', message: 'failed to create user'});

    // send mail to request for verification
    var mailOptions = {
        from: 'youremail@gmail.com',
        to: 'myfriend@yahoo.com, myotherfriend@gmail.com',
        subject: 'Sending Email using Node.js',
        // html: '<h1>Welcome</h1><p>That was easy!</p>',
        text: 'That was easy!'
    };
    
    mailer.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return res.status(500).send({status: 'failed', message: 'Failed to send email'});
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({status: 'success', message: 'User created and Verification email sent.', data: user});
        }
    });
    
  });
});

/* GET users listing. */
router.get('/', token_verifier, (req, res, next) => {
  User.findById(req.verifiedId, {password: 0}, (err, user) => {
      if (err) return res.status(500).send({status: 'failed', message: 'there was a problem authenticating user'});

      User.find({}, {password: 0}, (err, users) => {
          if (err) return res.status(500).send({status: 'failed', message: 'there was a problem finding users.'});
          return res.status(200).send({status: 'success', users: users});
      });
  });
});


// GET a single user listing
router.get('/:id', token_verifier, (req, res) => {
    User.findById(req.verifiedId, { password: 0 }, (err, user) => { // { password: 0 }projection
        if (err) return res.status(500).send({status: 'failed', message: 'there was a problem authenticating token'});

        User.findById(req.params.id, (err, user) => {
            if (err) return res.status(500).send({status: 'failed', message: 'there was a problem finding user'});
            return res.status(200).send({status: 'success', user: user});
        });
    });
});

// Update (PUT) a single user listing
router.put('/:id', token_verifier, (req, res) => {
    User.findById(req.verifiedId, { password: 0 }, (err, user) => { // { password: 0 }projection
        if (err) return res.status(500).send({status: 'failed', message: 'there was a problem authenticating token'});

        User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
            if (err) return res.status(500).send({status: 'failed', mesage: "There was a problem updating the user."});
            return res.status(200).send({status: 'success', user: user, message: 'users successfully updated.'});
        });
    });
});

// DELETE a single user listing
router.delete('/:id', token_verifier, (req, res) => {
    User.findById(req.verifiedId, { password: 0 }, (err, user) => { // { password: 0 } projection
        if (err) return res.status(500).send({status: 'failed', message: 'there was a problem authenticating token'});

        User.findByIdAndRemove(req.params.id, (err, user) => {
            if (err) return res.status(500).send({status: 'failed', mesage: "There was a problem deleting the user."});
            return res.status(200).send({status: 'success', user: user, message: 'users successfully removed.'});
        });
    });
});


// Upload (PUT) a user avatar listing
router.put('/:id', token_verifier, (req, res) => {
  User.findById(req.verifiedId, { password: 0 }, (err, user) => { // { password: 0 }projection
      if (err) return res.status(500).send({status: 'failed', message: 'there was a problem authenticating token'});

      var form = new formidable.IncomingForm();

      form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = '../public/images' + files.filetoupload.name;

        fs.rename(oldpath, newpath, function (err) {
          if (err) return res.status(500).send({status: 'failed', mesage: "There was a problem uploading the file."});

          User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
              if (err) return res.status(500).send({status: 'failed', mesage: "There was a problem updating the user."});
              return res.status(200).send({status: 'success', user: user, message: 'File uploaded and successfully moved.'});
          });

        });

      });
  });
});

module.exports = router;
