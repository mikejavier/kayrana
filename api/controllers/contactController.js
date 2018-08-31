const express = require('express');
const authMiddleware = require('../middlewares/auth');
const { Contact } = require('../models');

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  Contact.findAll({ 
    where: { userId: req.userId },
    attributes: { exclude: ['updatedAt', 'userId'] }
  })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

router.post('/', (req, res) => {
  const payload = req.body;

  payload.userId = req.userId;

  Contact.create(payload)
    .then(contact => {
      const contactPayload = contact.get({
        plain: true
      });

      delete contactPayload.userId;
      delete contactPayload.updatedAt;

      res.json(contact);
    })
    .catch(() => {
      const error = {
        code: '9',
        message: 'invalid json format.'
      };
      return res.status(400).json(error);
    });
});

router.put('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  
  if (req.body.userId) delete req.body.userId;

  Contact.update(req.body, {
    where: { id, userId: req.userId },
    returning: true
  })
    .then((payload) => {
      if (!payload[0]) return res.status(401).end();

      const contactPayload = payload[1][0].get({
        plain: true
      });

      delete contactPayload.userId;
      delete contactPayload.updatedAt;

      return res.json(contactPayload);
    })
    .catch(() => res.status(500).end());
});

router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;

  Contact.destroy({
    where: { id, userId: req.userId }
  })
    .then((payload) => {
      if (!payload) return res.status(401).end();
      return res.status(204).json();
    })
    .catch (() => res.status(500).end());
});

module.exports = router;  