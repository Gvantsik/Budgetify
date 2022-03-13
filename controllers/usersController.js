const express = require('express');
const passport = require('passport');
const {
  getAllUsers,
  getOneUser,
  getUsersAccounts,
  getUsersTransactions,
} = require('../services/usersService');

const authGuard = passport.authenticate('jwt', { session: false });

const Role = require('../auth/roles');
const { authorize } = require('../auth/guards');

const userRouter = express.Router();

userRouter.get('/', authGuard, authorize(Role.Admin), getAllUsers);
userRouter
  .get('/:id', authGuard, getOneUser)
  .get('/:id/accounts', authGuard, getUsersAccounts)
  .get('/:id/transactions', authGuard, getUsersTransactions);

module.exports = userRouter;
