const express = require('express');
const passport = require('passport');
const {
  getOneAccount,
  updateAccount,
  createAccount,
  deleteAccount,
} = require('../services/accountsService');

const accountsRouter = express.Router();
const authGuard = passport.authenticate('jwt', { session: false });

accountsRouter
  .get('/:id', authGuard, getOneAccount)
  .patch('/:id', authGuard, updateAccount)
  .delete('/:id', authGuard, deleteAccount);

accountsRouter.post('/', authGuard, createAccount);

module.exports = accountsRouter;
