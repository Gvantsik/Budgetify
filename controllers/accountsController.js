const express = require('express');
const passport = require('passport');
const {
  getOneAccount,
  updateAccount,
  createAccount,
  deleteAccount,
  getUsersAccounts,
} = require('../services/accountsService');

const accountsRouter = express.Router();
const authGuard = passport.authenticate('jwt', { session: false });

accountsRouter
  .get('/:id', authGuard, getOneAccount)
  .get('/', authGuard, getUsersAccounts)
  .patch('/:id', authGuard, updateAccount)
  .delete('/:id', authGuard, deleteAccount);

accountsRouter.post('/', authGuard, createAccount);

module.exports = accountsRouter;
