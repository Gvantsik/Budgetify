/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const routes = require('./routes');

require('dotenv').config();

const app = express();

const dbURL = `${process.env.MONGODB_URL}${process.env.DB_NAME}`;
mongoose.connect(
  dbURL,
  () => {
    console.log('Connected to database');
  },
  (err) => {
    console.log(err);
  }
);
const logger = (req, res, next) => {
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

app.use('/', routes);

const port = process.env.PORT;

if (!process.env.PORT) {
  console.error('ERROR: No PORT specified');
  throw new Error('PORT is not defined');
}

app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});
