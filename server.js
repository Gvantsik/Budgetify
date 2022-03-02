const express = require ("express");
const database = require('./database/database')
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth')
const accountsRouter = require('./routes/accounts')
// const categoriesRouter = require('./routes/categories')
// const transactionsRouter = require('./routes/transactions')

const app = express();

const logger = (req, res, next) => {
  console.log(`${new Date().toString()} - ${req.method} ${req.path} ${req.originalUrl}`);
  next();
}

app.use(logger);
app.use(express.json());

app.use(express.static('public'));
app.set('view engine', 'ejs');


app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/accounts', accountsRouter);


app.listen(3000,() => {
    console.log('Server is running')
});