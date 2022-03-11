const express = require('express');
const passport = require('passport');
const {
  getOneAccount,
  updateAccount,
  createAccount,
  deleteAccount,
} = require('../controllers/accountsController');

const accountsRouter = express.Router();
const authGuard = passport.authenticate('jwt', { session: false });

const Role = require('../auth/roles');
const { authorize } = require('../auth/guards');

accountsRouter
  .get('/:id', authGuard, authorize(Role.User), getOneAccount)
  .patch('/:id', authGuard, authorize(Role.User), updateAccount)
  .delete('/:id', authGuard, authorize(Role.User), deleteAccount);

accountsRouter.post('/', authGuard, createAccount);

module.exports = accountsRouter;
