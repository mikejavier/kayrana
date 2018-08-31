const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const router = express.Router();

router.post('/login', (req, res) => {
  const error = {
    code: '11',
    message: 'User not found.'
  };
  const { email, password } = req.body;

  if (!email || !password) {
    error.code = '12';
    error.message = 'Invalid data';
    return res.status(400).json(error);
  }

  User.findOne({ where: { email }})
    .then((user) => {
      if (!user) return res.status(400).json(error);
      
      bcrypt.compare(password, user.password)
        .then((result) => {
          if (!result) {
            error.code = '13';
            error.message = 'Invalid email or password.';
            return res.status(400).json(error);
          }

          user.password = undefined;

          const token = jwt.sign({ id: user.get('id') }, process.env.APP_KEY, {
            expiresIn: 86400
          });

          return res.json({user, token});
        });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;