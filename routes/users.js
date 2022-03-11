const express = require('express');
const passport = require('passport');
const {
  getAllUsers,
  getOneUser,
  getUsersAccounts,
  getUsersTransactions,
} = require('../controllers/usersController');

const authGuard = passport.authenticate('jwt', { session: false });

const Role = require('../auth/roles');
const { authorize } = require('../auth/guards');

const userRouter = express.Router();

userRouter.get('/', authGuard, authorize(Role.Admin), getAllUsers);
userRouter
  .get('/:id', authGuard, getOneUser)
  .get('/:id/accounts', authGuard, authorize(Role.User), getUsersAccounts)
  .get(
    '/:id/transactions',
    authGuard,
    authorize(Role.User),
    getUsersTransactions
  );

module.exports = userRouter;
