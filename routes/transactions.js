const express = require('express');
const passport = require('passport');
const {
  getOneTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionsController');

const transactionsRouter = express.Router();
const authGuard = passport.authenticate('jwt', { session: false });

const Role = require('../auth/roles');
const { authorize } = require('../auth/guards');

transactionsRouter
  .get('/:id', authGuard, authorize(Role.User), getOneTransaction)
  .patch('/:id', authGuard, authorize(Role.User), updateTransaction)
  .delete('/:id', authGuard, authorize(Role.User), deleteTransaction);

transactionsRouter.post(
  '/',
  authGuard,
  authorize(Role.User),
  createTransaction
);

module.exports = transactionsRouter;
