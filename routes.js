const express = require('express');
const usersRouter = require('./controllers/usersController');
const authRouter = require('./controllers/authController');
const accountsRouter = require('./controllers/accountsController');
const categoriesRouter = require('./controllers/categoriesController');
const transactionsRouter = require('./controllers/transactionsController');

const routes = express.Router();

routes.use('/auth', authRouter);
routes.use('/users', usersRouter);
routes.use('/accounts', accountsRouter);
routes.use('/categories', categoriesRouter);
routes.use('/transactions', transactionsRouter);

module.exports = routes;
