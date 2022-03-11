const express = require('express');

const { login, register } = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/', register).post('/login', login);

module.exports = authRouter;
