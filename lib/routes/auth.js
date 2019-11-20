const { Router } = require('express');
const User = require('../model/User');

// eslint-disable-next-line new-cap
module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    User.create({ username, password })
      .then(user => {
        res.cookie('session', user.token());
        res.send(user);
      })
      .catch(next);
  })
  .post('/login', (req, res, next) => {
    const { username, password } = req.body;
    User
      .findOne({ username })
      .then(user => {
        if(!user || !user.compare(password)) throw new Error('Invalid username or password');
        res.cookie('session', user.token());
        res.send(user);
      })
      .catch(next);
  });