const express = require('express');
const passport = require('passport');
const {
  getOneTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getUsersTransactions,
} = require('../services/transactionsService');

const transactionsRouter = express.Router();
const authGuard = passport.authenticate('jwt', { session: false });

transactionsRouter
  .get('/:id', authGuard, getOneTransaction)
  .get('/account/:id', authGuard, getUsersTransactions)

  .patch('/:id', authGuard, updateTransaction)
  .delete('/:id', authGuard, deleteTransaction);

transactionsRouter.post('/', authGuard, createTransaction);

module.exports = transactionsRouter;
