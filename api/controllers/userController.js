const express = require('express');
const authMiddleware = require('../middlewares/auth');
const { User } = require('../models');

const router = express.Router();

router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  User.findById(id, {
    attributes: { exclude: ['password', 'deletedAt', 'updatedAt'] }
  })
    .then(user => res.json(user));
});

router.post('/', (req, res) => {
  User.create(req.body)
    .then(user => {
      const userPayload = user.get({
        plain: true
      }); 

      delete userPayload.password;
      delete userPayload.deletedAt;
      delete userPayload.updatedAt;

      return res.status(201).json(userPayload);
    })
    .catch(err => {
      const errorType = err.errors[0].type;
      const error = {
        code: '9',
        message: 'invalid json format.'
      };

      if (errorType === 'unique violation') {
        error.code = '10';
        error.message = 'user already registered.';
      }

      return res.status(400).json(error);
    });
});

router.put('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;

  if (parseInt(id) !== req.userId) return res.status(401).end();

  User.update(req.body, {
    where: { id },
    returning: true
  })
    .then((payload) => {
      const userPayload = payload[1][0].get({
        plain: true
      }); 

      delete userPayload.password;
      delete userPayload.deletedAt;
      delete userPayload.updatedAt;

      return res.json(userPayload);
    });

});

router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;

  if (parseInt(id) !== req.userId) return res.status(401).end();

  User.destroy({
    where: { id }
  })
    .then(() => res.status(204).json());
});

module.exports = router;