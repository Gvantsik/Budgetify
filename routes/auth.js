const express = require('express');

const authRouter = express.Router();
const database = require('../database/database');

authRouter.post('/login', (req, res) => {
  for (let i = 0; i < database.users.length; i++) {
    if (
      req.body.email === database.users[i].email &&
      req.body.password === database.users[i].password
    ) {
      res.status(202).json({
        status: 'success',
        data: {
          message: 'user logged in successfully',
        },
      });
      return;
    }
  }
  res.status(404).json({
    status: 'error',
    message: 'User email or password is incorrect',
  });
});
authRouter.get('/logout', (req, res) => {
  res.send('User has logged out');
});

module.exports = authRouter;
