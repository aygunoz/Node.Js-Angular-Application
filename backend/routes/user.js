const express = require('express');
const router = express.Router();
const bcyrpt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next) => {
  bcyrpt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
});

router.post('/login', (req, res, next) => {
  let fetchUser;
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth Failed'
        })
      }
      fetchUser = user;
      return bcyrpt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth Failed'
        })
      }
      const token = jwt.sign({email: fetchUser.email, userId: fetchUser._id}, 'secret', {expiresIn: '1h'});
      return res.status(200).json({
        token: token,
        expiresIn: 3600
      })
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Auth Failed'
      })
    })
});

module.exports = router;
