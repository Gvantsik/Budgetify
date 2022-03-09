const express = require('express');
const database = require('./database/database');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const accountsRouter = require('./routes/accounts');
const categoriesRouter = require('./routes/categories');
const transactionsRouter = require('./routes/transactions');

require('dotenv').config();
const app = express();

const logger = (req, res, next) => {
  console.log(
    `${new Date().toString()} - ${req.method} ${req.path} ${req.originalUrl}`
  );
  next();
};

app.use(logger);
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/accounts', accountsRouter);
app.use('/categories', categoriesRouter);
app.use('/transactions', transactionsRouter);

const port = process.env.PORT;

if (!process.env.PORT) {
  console.error('ERROR: No PORT specified');
  throw new Error('PORT is not defined');
}

app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});
