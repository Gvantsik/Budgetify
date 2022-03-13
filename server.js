const express = require('express');
const cors = require('cors');
const passport = require('passport');
const usersRouter = require('./controllers/usersController');
const authRouter = require('./controllers/authController');
const accountsRouter = require('./controllers/accountsController');
const categoriesRouter = require('./controllers/categoriesController');
const transactionsRouter = require('./controllers/transactionsController');

require('dotenv').config();

const app = express();

const logger = (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(
    `${new Date().toString()} - ${req.method} ${req.path} ${req.originalUrl}`
  );
  next();
};

app.use(cors());
app.use(logger);
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/accounts', accountsRouter);
app.use('/categories', categoriesRouter);
app.use('/transactions', transactionsRouter);

const port = process.env.PORT;

if (!process.env.PORT) {
  // eslint-disable-next-line no-console
  console.error('ERROR: No PORT specified');
  throw new Error('PORT is not defined');
}

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
